import React from 'react';
import { Menu, Search } from 'lucide-react';

export default function Topbar({ onOpenSidebar, title = 'Dashboard' }) {
  return (
    <header className="h-14 bg-white border-b border-[#E2E8F0] sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Title & Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-semibold text-[#172B24]">
          {title}
        </h1>
      </div>

      {/* Middle: Minimal Search Input */}
      <div className="hidden sm:flex items-center flex-1 max-w-xs mx-6">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search records or threats..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#172B24] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#059669] focus:border-[#059669] transition-all"
          />
        </div>
      </div>

      {/* Right: Minimal User Profile */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#064E3B] text-white text-xs font-medium flex items-center justify-center">
            SS
          </div>
          <span className="text-xs font-medium text-[#172B24] hidden sm:inline">
            Security Team
          </span>
        </div>
      </div>
    </header>
  );
}
