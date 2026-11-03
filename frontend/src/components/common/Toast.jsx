import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#172B24] text-white text-xs font-medium shadow-lg border border-slate-700/60 animate-fadeIn">
      {isSuccess ? (
        <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
      )}
      <span className="text-slate-100">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

