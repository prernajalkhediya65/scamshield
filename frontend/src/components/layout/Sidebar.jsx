import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe,
  MessageSquare,
  Tag,
  Phone,
  History,
  BarChart2,
  Settings,
  Shield,
  X,
  Home,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'URL Scanner', to: '/scanner/url', icon: Globe },
  { name: 'Message Scanner', to: '/scanner/message', icon: MessageSquare },
  { name: 'Phone Scanner', to: '/scanner/phone', icon: Phone },
  { name: 'Offer Detector', to: '/scanner/offer', icon: Tag },
  { name: 'Scan History', to: '/history', icon: History },
  { name: 'Analytics', to: '/analytics', icon: BarChart2 },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 bg-[#064E3B] text-white flex flex-col transition-transform duration-200 ease-out border-r border-[#043c2d] lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <div className="w-7 h-7 rounded-lg bg-[#059669] flex items-center justify-center text-white">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">
              ScamShield<span className="text-[#10B981] font-normal"> AI</span>
            </span>
          </Link>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
          <div className="mb-2 px-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-[11px] font-medium text-emerald-200/80 hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>← Back to Public Website</span>
            </Link>
          </div>

          <nav className="space-y-0.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end={item.to === '/dashboard'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-emerald-100/75 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile / Status */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5">
            <div className="w-7 h-7 rounded-full bg-[#10B981] text-[#064E3B] font-bold text-xs flex items-center justify-center flex-shrink-0">
              SS
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-white truncate">Security Lead</p>
              <p className="text-[10px] text-emerald-200/60 truncate">Enterprise Node</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
