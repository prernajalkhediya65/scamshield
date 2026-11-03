import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';
import { normalizeRiskLevel } from '../../utils/riskUtils';

export default function RiskBadge({ riskLevel, showIcon = true, size = 'sm' }) {
  const category = normalizeRiskLevel(riskLevel);

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  }[size] || 'text-[11px] px-2 py-0.5 gap-1';

  if (category === 'SAFE') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 ${sizeClasses}`}>
        {showIcon && <ShieldCheck className="w-3 h-3 flex-shrink-0" />}
        <span>SAFE</span>
      </span>
    );
  }

  if (category === 'DANGEROUS') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${sizeClasses}`}>
        {showIcon && <ShieldAlert className="w-3 h-3 flex-shrink-0" />}
        <span>DANGEROUS</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200 ${sizeClasses}`}>
      {showIcon && <AlertTriangle className="w-3 h-3 flex-shrink-0" />}
      <span>SUSPICIOUS</span>
    </span>
  );
}
