import React from 'react';
import { FileInput, Cpu, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Submit Suspicious Content',
      icon: FileInput,
      description:
        'Paste any suspicious SMS, WhatsApp message, email, website URL, phone number, or job offer directly into the designated scanner.',
      highlight: 'Zero installation required',
    },
    {
      number: '02',
      title: 'Multimodal Gemini AI Analysis',
      icon: Cpu,
      description:
        'Google Gemini AI models dissect the payload for linguistic coercion, psychological urgency, domain spoofing heuristics, and fraud indicators.',
      highlight: 'Deep contextual reasoning',
    },
    {
      number: '03',
      title: 'Receive Actionable Intelligence',
      icon: ShieldAlert,
      description:
        'Get an immediate 0–100 Risk Score, standardized SAFE, SUSPICIOUS, or DANGEROUS classification, concrete reasons, and a downloadable PDF report.',
      highlight: 'Forensic PDF export',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Simple & Transparent Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B24] tracking-tight">
            How ScamShield AI Evaluates Threats
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Move from uncertainty to definitive risk classification in three simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-2xs relative flex flex-col justify-between text-left hover:border-emerald-200 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#059669] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      Step {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-center text-slate-700">
                      <Icon className="w-4 h-4 text-[#059669]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-[#172B24]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-medium text-slate-700">
                    {step.highlight}
                  </span>
                  <span className="text-slate-300">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA prompt */}
        <div className="mt-12 text-center">
          <Link
            to="/scanner/message"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <span>Try It Yourself Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

