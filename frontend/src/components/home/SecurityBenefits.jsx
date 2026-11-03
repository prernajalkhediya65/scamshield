import React from 'react';
import {
  Lock,
  Database,
  FileCheck2,
  Brain,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export default function SecurityBenefits() {
  const benefits = [
    {
      title: 'Contextual Cognitive AI',
      icon: Brain,
      description:
        'Powered by Google Gemini 2.5 Flash Lite, evaluating intent, subtlety, and psychological pressure rather than relying solely on static keyword lists.',
    },
    {
      title: 'Audit-Ready Threat Reports',
      icon: FileCheck2,
      description:
        'Instantly generate comprehensive, client-side PDF threat intelligence reports with risk scores and forensic reasons for audit trails or security reporting.',
    },
    {
      title: 'Transparent Heuristic Reasoning',
      icon: ShieldCheck,
      description:
        'Every scan outputs clear, itemized reasons explaining exactly why content was categorized as SAFE, SUSPICIOUS, or DANGEROUS.',
    },
    {
      title: 'Persistent Scan History',
      icon: Database,
      description:
        'Scans are securely stored in MongoDB with full audit searchability, single-click record deletion, and total history clearance on demand.',
    },
  ];

  return (
    <section id="benefits" className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          {/* Left Summary Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
              Verified Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B24] tracking-tight">
              Designed for Honest, Accurate Cyber Defense
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              ScamShield AI prioritizes accuracy and integrity over sensationalism. We do not invent fake databases or promise absolute security—we provide real-time heuristic intelligence to help you make informed decisions before interacting with suspicious content.
            </p>

            <div className="pt-3 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">
                  Zero synthetic or fabricated phone carrier registries
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">
                  Objective 0–100 threat scoring calibrated to scam severity
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">
                  Actionable protective recommendations provided for every scan
                </span>
              </div>
            </div>
          </div>

          {/* Right Benefits Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] rounded-xl p-5 border border-[#E2E8F0] space-y-3 text-left hover:border-emerald-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#059669]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#172B24]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

