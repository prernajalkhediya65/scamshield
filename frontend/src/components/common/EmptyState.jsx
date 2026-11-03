import React from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  title = "No Scan Data Found",
  description = "No threats or scans have been logged yet. Start scanning suspicious URLs, messages, or offers.",
  actionText = "Launch URL Scanner",
  actionLink = "/scanner/url",
  icon: Icon = ShieldAlert,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border border-dashed border-[#CBD5E1] rounded-2xl">
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-4 border border-emerald-100 shadow-sm">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-[#172B24] mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-150"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

