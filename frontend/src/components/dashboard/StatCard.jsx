import React from 'react';

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  variant = 'default',
}) {
  const accentClasses = {
    default: 'text-slate-400',
    safe: 'text-[#059669]',
    medium: 'text-amber-500',
    danger: 'text-rose-500',
  }[variant] || 'text-slate-400';

  return (
    <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500">
          {title}
        </span>
        {Icon && <Icon className={`w-4 h-4 ${accentClasses}`} />}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-[#172B24]">
          {value}
        </span>
        {subtext && (
          <span className="text-[11px] text-slate-400 font-medium">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}
