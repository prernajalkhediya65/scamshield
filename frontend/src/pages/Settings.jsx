import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  ShieldCheck,
  Bell,
  Lock,
  LogOut,
  ChevronRight,
  FileText,
  HelpCircle,
  Info,
  Check
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { getUserInitials } from '../utils/userUtils';

export default function Settings() {
  const { user, logout } = useAuth();

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('scamshield_notifications');

    return saved
      ? JSON.parse(saved)
      : {
          email: true,
          security: true,
          scamAlerts: true
        };
  });

  useEffect(() => {
    localStorage.setItem(
      'scamshield_notifications',
      JSON.stringify(notifications)
    );
  }, [notifications]);

  const initials = getUserInitials(user?.name, user?.email);

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const Toggle = ({ enabled, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={enabled}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
        enabled ? 'bg-emerald-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  const SettingRow = ({
    icon: Icon,
    title,
    description,
    action
  }) => (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-emerald-700" />
        </div>

        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-slate-800">
            {title}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {action}
    </div>
  );

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-7 pb-8 text-left">

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-[#172B24]">
          Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account, security and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800">
            Profile Information
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Your personal account details.
          </p>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center text-lg font-bold">
              {initials}
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-800">
                {user?.name || user?.username || 'User'}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {user?.email || 'Email not available'}
              </p>

              <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-700">
                <Check className="w-3.5 h-3.5" />
                Account Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm">

        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800">
            Security & Privacy
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Keep your ScamShield account secure.
          </p>
        </div>

        <div className="px-5">

          <SettingRow
            icon={Lock}
            title="Password & Security"
            description="Manage your account password."
            action={
              <span className="text-xs text-slate-400">
                <ChevronRight className="w-4 h-4" />
              </span>
            }
          />

          <SettingRow
            icon={ShieldCheck}
            title="Account Protection"
            description="Your account is protected by secure authentication."
            action={
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Protected
              </span>
            }
          />

          <SettingRow
            icon={LogOut}
            title="Logout"
            description="Sign out from your current account."
            action={
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            }
          />

        </div>
      </section>

      {/* Notification Section */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm">

        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800">
            Notifications
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Customize your notification preferences.
          </p>
        </div>

        <div className="px-5">

          <SettingRow
            icon={Mail}
            title="Email Notifications"
            description="Receive important updates through email."
            action={
              <Toggle
                enabled={notifications.email}
                onClick={() => toggleNotification('email')}
              />
            }
          />

          <SettingRow
            icon={ShieldCheck}
            title="Security Alerts"
            description="Get notified about important security events."
            action={
              <Toggle
                enabled={notifications.security}
                onClick={() => toggleNotification('security')}
              />
            }
          />

          <SettingRow
            icon={Bell}
            title="Scam Detection Alerts"
            description="Receive alerts about detected threats."
            action={
              <Toggle
                enabled={notifications.scamAlerts}
                onClick={() => toggleNotification('scamAlerts')}
              />
            }
          />

        </div>
      </section>

      {/* About Section */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm">

        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800">
            About ScamShield
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Information about our platform.
          </p>
        </div>

        <div className="px-5">

          <SettingRow
            icon={Info}
            title="Application"
            description="ScamShield AI"
            action={
              <span className="text-xs text-slate-500">
                v1.0.0
              </span>
            }
          />

          <SettingRow
            icon={FileText}
            title="Privacy & Terms"
            description="Learn how your information is handled."
            action={
              <ChevronRight className="w-4 h-4 text-slate-400" />
            }
          />

          <SettingRow
            icon={HelpCircle}
            title="Help & Support"
            description="Get assistance with ScamShield."
            action={
              <ChevronRight className="w-4 h-4 text-slate-400" />
            }
          />

        </div>
      </section>

      {/* Footer */}
      <div className="text-center pt-2">
        <p className="text-xs text-slate-400">
          ScamShield AI · Stay Safe, Stay Protected.
        </p>
      </div>

    </div>
  );
}