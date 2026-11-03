import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, FileText, Globe, MessageSquare, Phone, Tag, LayoutDashboard, History, BarChart2, Settings } from 'lucide-react';

export default function HomeFooter() {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#064E3B] flex items-center justify-center text-white">
                <Shield className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="font-bold text-sm tracking-tight text-[#172B24]">
                ScamShield<span className="text-[#059669] font-semibold"> AI</span>
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              ScamShield AI provides intelligent, multi-vector scam and smishing detection. Helping individuals and organizations identify social engineering threats before compromising sensitive information.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
              <span>AI Detection Node Active</span>
            </div>
          </div>

          {/* Scanners Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#172B24] block">
              Active Scanners
            </span>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/scanner/url" className="hover:text-[#059669] transition-colors flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>URL Scanner</span>
                </Link>
              </li>
              <li>
                <Link to="/scanner/message" className="hover:text-[#059669] transition-colors flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Message Scanner</span>
                </Link>
              </li>
              <li>
                <Link to="/scanner/phone" className="hover:text-[#059669] transition-colors flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Phone Scanner</span>
                </Link>
              </li>
              <li>
                <Link to="/scanner/offer" className="hover:text-[#059669] transition-colors flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>Offer Detector</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Console Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#172B24] block">
              Platform
            </span>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/dashboard" className="hover:text-[#059669] transition-colors flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                  <span>Threat Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#059669] transition-colors flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-slate-400" />
                  <span>Scan History</span>
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-[#059669] transition-colors flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Telemetry Analytics</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-[#059669] transition-colors flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Integrity Disclaimer */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#172B24] block">
              Security Notice
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              ScamShield AI utilizes heuristic AI pattern assessment. Analyses are advisory and designed to augment user vigilance. Always confirm transactions through official institutional portals.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ScamShield AI. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Powered by Google Gemini</span>
            <span>•</span>
            <span>MongoDB Atlas Persistent Storage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

