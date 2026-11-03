import React, { useState } from 'react';
import { X, Calendar, AlertCircle, Copy, Check, Download } from 'lucide-react';
import RiskBadge from './RiskBadge';
import TypeBadge from './TypeBadge';
import { normalizeRiskLevel, computeRiskScore, getRiskScoreExplanation } from '../../utils/riskUtils';
import { generatePdfReport } from '../../utils/generatePdfReport';

export default function ScanDetailModal({ scan, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !scan) return null;

  const riskCategory = normalizeRiskLevel(scan.riskLevel);
  const reasons = Array.isArray(scan.reasons) ? scan.reasons : [];
  const riskScore = scan.riskScore || computeRiskScore(scan.riskLevel, reasons);
  const scoreInfo = getRiskScoreExplanation(riskScore);

  const handleCopy = () => {
    navigator.clipboard.writeText(scan.content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    try {
      generatePdfReport(scan, scan.type);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Could not generate PDF report.');
    } finally {
      setDownloading(false);
    }
  };

  const formattedDate = scan.createdAt
    ? new Date(scan.createdAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Unknown Date';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg border border-[#E2E8F0] max-w-xl w-full max-h-[88vh] flex flex-col overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <TypeBadge type={scan.type} />
            <RiskBadge riskLevel={riskCategory} size="sm" />
            <span className="text-xs font-mono font-semibold text-slate-600 ml-1">
              {riskScore}/100
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-left text-xs">
          {/* Risk Score Summary Banner */}
          <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Risk Classification: <span className="text-[#172B24]">{riskCategory}</span>
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {scoreInfo.detail}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-[#172B24]">{riskScore}</span>
              <span className="text-[10px] text-slate-400 font-mono">/100</span>
            </div>
          </div>

          {/* Payload */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Submitted Content
              </span>
              <button
                onClick={handleCopy}
                className="text-[11px] text-[#059669] hover:underline inline-flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3 text-slate-400" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-mono text-[11px] text-slate-800 break-all select-all">
              {scan.content}
            </div>
          </div>

          {/* Explanation */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Threat Analysis
            </span>
            <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-lg text-slate-800 leading-relaxed">
              {scan.explanation}
            </div>
          </div>

          {/* Indicators */}
          {reasons.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Observed Indicators ({reasons.length})
              </span>
              <ul className="space-y-1">
                {reasons.map((reason, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-md border border-[#E2E8F0] bg-white text-slate-700 text-[11px]"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendation */}
          {scan.recommendation && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Recommendation
              </span>
              <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-lg text-emerald-950 font-medium">
                {scan.recommendation}
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              ID: {scan._id}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#059669]" />
            <span>{downloading ? 'Preparing...' : 'Download PDF Report'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
