import React, { useState } from 'react';
import { AlertCircle, X, ArrowRight, Loader2, ShieldAlert } from 'lucide-react';
import scamApi from '../../api/scamApi';
import ScanResultCard from './ScanResultCard';

export default function ScannerView({
  type,
  apiType,
  formatPayload,
  title,
  subtitle,
  icon: Icon,
  inputLabel,
  placeholder,
  helperText,
  isMultiline = false,
  examples = [],
  validate,
  advisoryNote,
}) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError(null);

    const trimmed = content.trim();
    if (!trimmed) {
      setError('Please provide content to scan.');
      return;
    }

    if (validate) {
      const validationError = validate(trimmed);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setLoading(true);
    setResult(null);

    try {
      const payload = formatPayload ? formatPayload(trimmed) : trimmed;
      const targetType = apiType || type;
      const data = await scamApi.analyze(targetType, payload);
      setResult(data);
    } catch (err) {
      console.error('Scan error:', err);
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Scan failed. Please check connection to the backend server.';
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setContent('');
    setError(null);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const handleSelectExample = (exampleText) => {
    setContent(exampleText);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left">
      {/* Header */}
      <div className="pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center border border-emerald-100 flex-shrink-0">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#172B24] tracking-tight">
              {title}
            </h2>
            <p className="text-xs text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Scanner Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="scanner-input"
                className="text-xs font-semibold text-[#172B24]"
              >
                {inputLabel}
              </label>
              {content && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {isMultiline ? (
              <textarea
                id="scanner-input"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                disabled={loading}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 text-xs text-[#172B24] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#059669] focus:border-[#059669] transition-colors resize-y font-mono disabled:opacity-60"
              />
            ) : (
              <input
                id="scanner-input"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                disabled={loading}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs text-[#172B24] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#059669] focus:border-[#059669] transition-colors font-mono disabled:opacity-60"
              />
            )}

            {helperText && (
              <p className="text-[11px] text-slate-400">
                {helperText}
              </p>
            )}

            {advisoryNote && (
              <div className="mt-2 p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg flex items-start gap-2 text-[11px] text-emerald-900/80 leading-relaxed">
                <ShieldAlert className="w-3.5 h-3.5 text-[#059669] flex-shrink-0 mt-0.5" />
                <span>{advisoryNote}</span>
              </div>
            )}
          </div>

          {/* Validation/API Error Alert */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Powered by Google Gemini AI
            </span>
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing Threat Vector...</span>
                </>
              ) : (
                <>
                  <span>Scan Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Examples Section */}
        {examples.length > 0 && !result && (
          <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Quick Test Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {examples.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectExample(item.value)}
                  disabled={loading}
                  className="px-2.5 py-1 text-xs bg-[#F8FAFC] hover:bg-slate-100 text-slate-700 rounded-md border border-[#E2E8F0] transition-colors text-left flex items-center gap-1.5"
                  title={item.value}
                >
                  <span className="font-semibold text-slate-800">{item.label}:</span>
                  <span className="font-mono text-slate-500 truncate max-w-[200px] sm:max-w-xs text-[11px]">
                    {item.display || item.value}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Analysis Result */}
      {result && (
        <ScanResultCard
          result={result}
          originalContent={content}
          type={type}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
