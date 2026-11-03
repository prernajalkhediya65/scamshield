import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ArrowRight,
  LayoutDashboard,
  CheckCircle,
  AlertTriangle,
  FileText,
  Lock,
  Sparkles,
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E2E8F0] bg-[#F8FAFC]">
      {/* Background subtle mesh decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-100/40 via-slate-100/20 to-transparent blur-3xl -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
              <span>AI-Powered Smishing & Fraud Protection</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172B24] tracking-tight leading-[1.15]">
              Detect Phishing, Fraudulent Links & Mobile Scams{' '}
              <span className="text-[#059669]">Before You Click.</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              ScamShield AI inspects suspicious SMS messages, WhatsApp chats, deceptive URLs, and callback phone numbers in real time. Powered by Google Gemini AI to deliver objective threat scoring and forensic safety guidance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/scanner/message"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
              >
                <span>Start Free Scan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl border border-[#E2E8F0] shadow-2xs transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-500" />
                <span>Open Threat Console</span>
              </Link>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#E2E8F0] max-w-lg">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#172B24] block">Multimodal</span>
                <span className="text-[11px] text-slate-500 block">URLs, Text & Phone</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#172B24] block">Gemini 2.5</span>
                <span className="text-[11px] text-slate-500 block">Cognitive Heuristics</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#172B24] block">Audit Ready</span>
                <span className="text-[11px] text-slate-500 block">Exportable PDF Reports</span>
              </div>
            </div>
          </div>

          {/* Right Column: Demo Inspection Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl border border-[#E2E8F0] shadow-md overflow-hidden">
              {/* Demo Watermark Header */}
              <div className="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
                    DEMO PREVIEW
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Sample Simulation</span>
              </div>

              {/* Sample Analysis Payload */}
              <div className="p-5 space-y-4 text-left">
                {/* Simulated Input */}
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Inspected SMS Payload
                  </span>
                  <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] font-mono text-[11px] text-slate-800 leading-relaxed">
                    "URGENT: Your SBI Bank account will be suspended today due to KYC failure. Update PAN immediately at <span className="text-rose-600 underline">http://sbi-kyc-verify-portal.net</span> to prevent hold."
                  </div>
                </div>

                {/* Simulated Result Gauge & Classification */}
                <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-600 block">
                        Assessed Risk Score
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-2xl font-black text-rose-700">92</span>
                        <span className="text-xs text-rose-600 font-medium">/ 100</span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-2xs">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>DANGEROUS</span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-rose-200/70 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-rose-600 h-1.5 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                {/* Simulated Indicators */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Identified Threat Vectors
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                      <span><strong>High Urgency Coercion:</strong> Threatens immediate account suspension.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                      <span><strong>Domain Spoofing:</strong> Unofficial domain mimicking SBI banking portal.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                      <span><strong>Credential Harvesting:</strong> Solicits sensitive KYC documents.</span>
                    </li>
                  </ul>
                </div>

                {/* Footer action preview */}
                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-[#059669] font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Real-time Gemini AI response</span>
                  </span>
                  <span className="font-mono text-slate-400 text-[10px]">Audit ID: SC-DEMO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

