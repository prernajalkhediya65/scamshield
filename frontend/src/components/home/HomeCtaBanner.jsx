import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, LayoutDashboard } from 'lucide-react';

export default function HomeCtaBanner() {
  return (
    <section className="py-16 sm:py-20 bg-[#064E3B] text-white text-left relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#10B981]/15 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#059669] text-white shadow-md mx-auto">
            <Shield className="w-6 h-6 text-[#10B981]" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Stop Guessing. Verify Suspicious Messages in Seconds.
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
            Whether it's an urgent SMS claiming account suspension or an unfamiliar website asking for bank details, ScamShield AI helps you verify before you click.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Link
              to="/scanner/message"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#10B981] hover:bg-[#059669] text-[#064E3B] hover:text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <span>Scan a Suspicious Message</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-300" />
              <span>Open Threat Console</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

