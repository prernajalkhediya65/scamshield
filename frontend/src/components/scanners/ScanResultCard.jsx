import React, { useState } from 'react';
import { Copy, Check, RotateCcw, AlertCircle, Download, FileText, Info } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import TypeBadge from '../common/TypeBadge';
import { normalizeRiskLevel, computeRiskScore, getRiskScoreExplanation } from '../../utils/riskUtils';
import { generatePdfReport } from '../../utils/generatePdfReport';

export default function ScanResultCard({ result, originalContent, type, onReset }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!result) return null;

  const riskCategory = normalizeRiskLevel(result.riskLevel);
  const reasons = Array.isArray(result.reasons) ? result.reasons : [];
  const riskScore = result.riskScore || computeRiskScore(result.riskLevel, reasons);
  const scoreInfo = getRiskScoreExplanation(riskScore);

  const handleCopyAnalysis = () => {
    const textToCopy = `[ScamShield AI Analysis]
Type: ${type}
Classification: ${riskCategory}
Risk Score: ${riskScore}/100 (${scoreInfo.summary})
Summary: ${result.explanation}
Indicators:
${reasons.map((r, i) => `${i + 1}. ${r}`).join('\n')}
Recommendation: ${result.recommendation || 'Verify independently.'}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    try {
      generatePdfReport({
        ...result,
        content: originalContent,
        type,
        riskScore,
      }, type);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Could not generate PDF report.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden text-left animate-fadeIn">
      {/* Top Banner */}
      <div className="px-5 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <TypeBadge type={type} />
          <RiskBadge riskLevel={riskCategory} size="md" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-[#E2E8F0] shadow-2xs transition-colors"
            title="Download comprehensive PDF threat report"
          >
            <Download className="w-3.5 h-3.5 text-[#059669]" />
            <span>{downloading ? 'Generating...' : 'Download PDF Report'}</span>
          </button>

          <button
            onClick={handleCopyAnalysis}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-[#E2E8F0] shadow-2xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scan Another</span>
          </button>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Risk Score Widget (0 - 100) */}
        <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Calculated Risk Score
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-[#172B24]">
                  {riskScore}
                  <span className="text-xs font-normal text-slate-400"> / 100</span>
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${scoreInfo.bgColor} ${scoreInfo.textColor} border ${scoreInfo.borderColor}`}>
                  {scoreInfo.summary}
                </span>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-xs font-medium text-slate-500">Classification</span>
              <p className="text-xs font-bold text-[#172B24]">{riskCategory}</p>
            </div>
          </div>

          {/* Progress Bar Gauge */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                riskCategory === 'SAFE'
                  ? 'bg-[#059669]'
                  : riskCategory === 'DANGEROUS'
                  ? 'bg-rose-600'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${Math.max(4, riskScore)}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 flex items-start gap-1.5 pt-0.5">
            <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>{scoreInfo.detail}</span>
          </p>
        </div>

        {/* Scanned Input */}
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Submitted Content
          </span>
          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-mono text-xs text-slate-800 break-all select-all">
            {originalContent}
          </div>
        </div>

        {/* AI Threat Explanation */}
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Threat Analysis
          </span>
          <p className="text-xs sm:text-sm text-[#172B24] leading-relaxed p-3.5 bg-slate-50 border border-[#E2E8F0] rounded-lg">
            {result.explanation}
          </p>
        </div>

        {/* Detection Reasons */}
        {reasons.length > 0 && (
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Individual Detection Indicators ({reasons.length})
            </span>
            <ul className="space-y-1.5">
              {reasons.map((reason, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 p-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs text-slate-700"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Safety Recommendation */}
        {result.recommendation && (
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Safety Recommendation
            </span>
            <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-lg text-xs text-[#172B24] font-medium leading-relaxed">
              {result.recommendation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
