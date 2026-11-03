import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight, LayoutDashboard, Globe, MessageSquare, Phone, Tag } from 'lucide-react';

export default function HomeNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#064E3B] flex items-center justify-center text-white shadow-2xs">
              <Shield className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-base tracking-tight text-[#172B24]">
                ScamShield<span className="text-[#059669] font-semibold"> AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium -mt-1 tracking-wider uppercase">
                Threat Defense
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
            <a href="#features" className="hover:text-[#059669] transition-colors">
              Scanning Features
            </a>
            <a href="#how-it-works" className="hover:text-[#059669] transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="hover:text-[#059669] transition-colors">
              Security & Privacy
            </a>
            <Link to="/history" className="hover:text-[#059669] transition-colors">
              Scan History
            </Link>
            <Link to="/analytics" className="hover:text-[#059669] transition-colors">
              Analytics
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-[#172B24] hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-[#E2E8F0]"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
              <span>Console</span>
            </Link>

            <Link
              to="/scanner/message"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              <span>Start Scanning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-[#172B24] rounded-md focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg text-left animate-fadeIn">
          <nav className="flex flex-col space-y-2 text-xs font-medium text-slate-700">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-md hover:bg-slate-50 hover:text-[#059669]"
            >
              Scanning Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-md hover:bg-slate-50 hover:text-[#059669]"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-md hover:bg-slate-50 hover:text-[#059669]"
            >
              Security & Privacy
            </a>
            <Link
              to="/history"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-md hover:bg-slate-50 hover:text-[#059669]"
            >
              Scan History
            </Link>
            <Link
              to="/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-md hover:bg-slate-50 hover:text-[#059669]"
            >
              Analytics
            </Link>
          </nav>

          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-50 border border-[#E2E8F0] rounded-lg"
            >
              Open Threat Console
            </Link>
            <Link
              to="/scanner/message"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 px-3 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg shadow-2xs"
            >
              Start Free Scan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

