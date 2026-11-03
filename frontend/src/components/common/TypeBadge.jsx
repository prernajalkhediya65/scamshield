import React from 'react';
import { Globe, MessageSquare, Tag, Phone } from 'lucide-react';

export default function TypeBadge({ type }) {
  const norm = String(type || '').toUpperCase();

  const iconMap = {
    URL: Globe,
    MESSAGE: MessageSquare,
    OFFER: Tag,
    PHONE: Phone,
  };

  const Icon = iconMap[norm] || Globe;

  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-[#F1F5F9] text-slate-600 border border-[#E2E8F0]">
      <Icon className="w-2.5 h-2.5 opacity-70" />
      <span>{norm}</span>
    </span>
  );
}
