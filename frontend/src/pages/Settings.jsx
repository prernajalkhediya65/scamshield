import React, { useState, useEffect } from 'react';
import { Shield, Server, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import scamApi from '../api/scamApi';

export default function Settings() {
  const [backendStatus, setBackendStatus] = useState('checking'); // 'online' | 'offline' | 'checking'

  const checkConnection = async () => {
    setBackendStatus('checking');
    try {
      await scamApi.getHistory();
      setBackendStatus('online');
    } catch {
      setBackendStatus('offline');
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="max-w-2xl space-y-6 text-left">
      {/* Header */}
      <div className="pb-3 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-semibold text-[#172B24] tracking-tight">
          Settings
        </h2>
        <p className="text-xs text-slate-500">
          Platform configurations and service connectivity
        </p>
      </div>

      {/* Backend API Connection Card */}
      <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Server className="w-4 h-4 text-slate-500" />
            <div>
              <h3 className="text-xs font-semibold text-[#172B24]">
                Backend Threat Service
              </h3>
              <p className="text-[11px] text-slate-400">
                http://localhost:8080/api/scams
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {backendStatus === 'online' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-[#059669] border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Connected
              </span>
            ) : backendStatus === 'offline' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                <AlertCircle className="w-3.5 h-3.5" />
                Offline
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Checking...
              </span>
            )}
            <button
              onClick={checkConnection}
              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              title="Test connection"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-[#E2E8F0]">
          ScamShield communicates with the local Express API service on port 8080 for URL analysis, message scanning, and persistent threat telemetry.
        </p>
      </div>

      {/* AI Engine Information Card */}
      <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs space-y-3">
        <div className="flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-[#059669]" />
          <h3 className="text-xs font-semibold text-[#172B24]">
            Threat Engine Configuration
          </h3>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1.5 border-b border-[#E2E8F0]">
            <span className="text-slate-500">Model Pipeline</span>
            <span className="font-mono text-slate-800 font-medium">Google Gemini 3.5 AI</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-[#E2E8F0]">
            <span className="text-slate-500">Output Format</span>
            <span className="font-mono text-slate-800 font-medium">Structured JSON Schema</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-slate-500">Risk Categories</span>
            <span className="text-slate-800 font-medium">Low, Medium, High</span>
          </div>
        </div>
      </div>
    </div>
  );
}

