import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  LogOut,
  Settings,
  History,
  ChevronDown,
  Shield,
  ShieldCheck,
  Mail,
  Calendar,
  Fingerprint,
  X,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserInitials } from '../../utils/userUtils';

export default function ProfileDropdown() {
  const { user, logout, refreshUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setModalOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenProfileModal = () => {
    setDropdownOpen(false);
    setModalOpen(true);
    // Refresh user data directly from /api/auth/me to ensure latest fields
    if (typeof refreshUser === 'function') {
      refreshUser();
    }
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/login');
  };

  const handleCopyId = (id) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const initials = getUserInitials(user?.name, user?.email);
  const displayName = user?.name || user?.username || 'Security Officer';
  const displayEmail = user?.email || 'Authenticated User';

  const formatMemberDate = (dateStr) => {
    if (!dateStr) return 'Active Member';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Active Member';
    }
  };

  return (
    <>
      {/* Dropdown Container */}
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          aria-haspopup="menu"
          className="flex items-center gap-2 p-1.5 sm:px-2 sm:py-1 rounded-xl text-slate-700 hover:text-[#172B24] hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#059669]/30"
        >
          {/* Avatar with initials (Requirement 1) */}
          <div className="w-8 h-8 rounded-lg bg-[#064E3B] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 shadow-xs border border-emerald-700/30">
            <span className="text-[#10B981] font-extrabold tracking-tight">
              {initials}
            </span>
          </div>

          {/* User Name */}
          <span className="text-xs font-semibold text-[#172B24] hidden sm:inline max-w-[140px] truncate text-left">
            {displayName}
          </span>

          {/* Chevron */}
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180 text-[#059669]' : ''
            }`}
          />
        </button>

        {/* Dropdown Panel */}
        {dropdownOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-[#E2E8F0] shadow-lg py-2 z-50 text-left animate-fadeIn"
          >
            {/* Header: Full Name & Registered Email (Requirement 2) */}
            <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]/50 rounded-t-2xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-white text-sm font-bold flex items-center justify-center flex-shrink-0 shadow-xs border border-emerald-700/30">
                  <span className="text-[#10B981] font-extrabold">{initials}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#172B24] truncate" title={displayName}>
                    {displayName}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5" title={displayEmail}>
                    {displayEmail}
                  </p>
                  <div className="mt-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-[#059669] border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                      Active Shield Protection
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Options */}
            <div className="p-1 space-y-0.5">
              {/* "My Profile" Option (Requirement 3) */}
              <button
                onClick={handleOpenProfileModal}
                role="menuitem"
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#064E3B] hover:bg-emerald-50/70 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span>My Profile</span>
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-[#059669] font-normal">
                  View
                </span>
              </button>

              {/* Scan History Link */}
              <Link
                to="/history"
                onClick={() => setDropdownOpen(false)}
                role="menuitem"
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#064E3B] hover:bg-emerald-50/70 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                    <History className="w-3.5 h-3.5" />
                  </div>
                  <span>Scan History</span>
                </div>
              </Link>

              {/* Settings Link */}
              <Link
                to="/settings"
                onClick={() => setDropdownOpen(false)}
                role="menuitem"
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#064E3B] hover:bg-emerald-50/70 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                  </div>
                  <span>Security Settings</span>
                </div>
              </Link>
            </div>

            {/* Divider */}
            <div className="my-1 border-t border-[#E2E8F0]"></div>

            {/* Logout Option (Requirement 4) */}
            <div className="p-1">
              <button
                onClick={handleLogout}
                role="menuitem"
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                </div>
                <span>Sign out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* "My Profile" Modal (Requirement 3 & 5) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div
            className="bg-white w-full max-w-md rounded-2xl border border-[#E2E8F0] shadow-2xl overflow-hidden animate-scaleUp text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#064E3B] flex items-center justify-center text-white shadow-2xs">
                  <Shield className="w-4 h-4 text-[#10B981]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#172B24]">
                    Security Profile
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Account credentials & active session overview
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
                aria-label="Close profile modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* User Identity Card */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="w-12 h-12 rounded-xl bg-[#064E3B] text-white text-base font-bold flex items-center justify-center flex-shrink-0 shadow-xs border border-emerald-700/40">
                  <span className="text-[#10B981] font-black">{initials}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#172B24] truncate">
                    {displayName}
                  </h4>
                  <p className="text-xs text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{displayEmail}</span>
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#059669] mt-1">
                    <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                    <span>Verified ScamShield User</span>
                  </span>
                </div>
              </div>

              {/* Account Details List */}
              <div className="space-y-2.5 text-xs">
                {/* Account ID */}
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#E2E8F0] bg-white">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Fingerprint className="w-3.5 h-3.5 text-slate-400" />
                    <span>Account ID</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] text-slate-700 max-w-[160px] truncate">
                      {user?.id || user?._id || 'Verified'}
                    </span>
                    {(user?.id || user?._id) && (
                      <button
                        onClick={() => handleCopyId(user?.id || user?._id)}
                        className="p-1 text-slate-400 hover:text-[#059669] transition-colors"
                        title="Copy Account ID"
                      >
                        {copiedId ? (
                          <CheckCircle2 className="w-3 h-3 text-[#059669]" />
                        ) : (
                          <span className="text-[10px] font-semibold">Copy</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#E2E8F0] bg-white">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Member Since</span>
                  </div>
                  <span className="font-medium text-slate-700">
                    {formatMemberDate(user?.createdAt)}
                  </span>
                </div>

                {/* Protection Standard */}
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#E2E8F0] bg-white">
                  <div className="flex items-center gap-2 text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Session Security</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-[#059669] border border-emerald-200">
                    HTTP-Only JWT Token
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between gap-3">
              <Link
                to="/settings"
                onClick={() => setModalOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669] hover:text-[#047857] transition-colors"
              >
                <span>Platform Settings</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#059669] hover:bg-[#047857] rounded-xl shadow-2xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
