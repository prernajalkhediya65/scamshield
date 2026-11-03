import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  MessageSquare,
  Phone,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function FeatureGrid() {
  const features = [
    {
      title: 'AI Message Scanner (Smishing)',
      category: 'SMS & Messaging',
      icon: MessageSquare,
      iconBg: 'bg-emerald-50 text-[#059669] border-emerald-200/80',
      description:
        'Scrutinizes suspicious SMS texts, WhatsApp forwards, Telegram messages, and urgent alerts for social engineering manipulation and credential harvesting.',
      threats: ['Urgent KYC Suspension Traps', 'Lottery & Prize Deceptions', 'Unauthorized Bank Alerts'],
      link: '/scanner/message',
      actionText: 'Scan a Message',
    },
    {
      title: 'Advanced URL Scanner',
      category: 'Web & Domains',
      icon: Globe,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200/80',
      description:
        'Examines website links for deceptive domain spoofing, typosquatting, credential harvesters, malicious redirects, and fake login portals.',
      threats: ['Lookalike Bank Portals', 'Typosquatting Domains', 'Credential Stealing Phishing'],
      link: '/scanner/url',
      actionText: 'Scan a Website URL',
    },
    {
      title: 'Fraud Phone Number Detection',
      category: 'Telecom & Voice',
      icon: Phone,
      iconBg: 'bg-sky-50 text-sky-600 border-sky-200/80',
      description:
        'Evaluates phone numbers against caller ID spoofing indicators, international Wangiri callback hooks, and toll-free tech support trap profiles.',
      threats: ['Toll-Free Refund Traps', 'High-Tariff Wangiri Scams', 'Unregistered Bank Claimants'],
      link: '/scanner/phone',
      actionText: 'Check Phone Number',
    },
    {
      title: 'Fake Offer & Job Detector',
      category: 'Financial & Employment',
      icon: Tag,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200/80',
      description:
        'Detects fraudulent job offers, work-from-home YouTube like tasks, fake e-commerce discounts, advance fee requests, and investment ponzi schemes.',
      threats: ['Pay-Per-Task YouTube Scams', 'Crypto Doubling Schemes', 'Advance Fee Employment'],
      link: '/scanner/offer',
      actionText: 'Analyze an Offer',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Comprehensive Modality Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B24] tracking-tight">
            Specialized Scanning Engines for Every Attack Vector
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Cybercriminals target users across SMS, WhatsApp, websites, and phone calls. ScamShield AI provides tailored threat models for each vector.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] hover:border-emerald-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between text-left group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-2xs ${item.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#172B24] group-hover:text-[#059669] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Sample Detected Threats */}
                  <div className="pt-3 border-t border-[#E2E8F0] space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Targeted Threat Indicators:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.threats.map((threat, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white text-slate-700 border border-[#E2E8F0]"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#059669]" />
                          <span>{threat}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-[#E2E8F0]">
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669] hover:text-[#047857] transition-colors"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

