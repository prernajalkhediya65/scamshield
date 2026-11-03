import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = {
  'Low Risk': '#10B981',
  'Medium Risk': '#F59E0B',
  'High Risk': '#EF4444',
};

export default function RiskDistributionChart({ safeCount = 0, mediumCount = 0, highCount = 0 }) {
  const total = safeCount + mediumCount + highCount;

  const data = [
    { name: 'Low Risk', value: safeCount, color: COLORS['Low Risk'] },
    { name: 'Medium Risk', value: mediumCount, color: COLORS['Medium Risk'] },
    { name: 'High Risk', value: highCount, color: COLORS['High Risk'] },
  ].filter((item) => item.value > 0);

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#172B24] tracking-tight">
            Risk Classification
          </h3>
          <p className="text-xs text-slate-400">
            Threat severity distribution
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center border border-emerald-100">
          <PieIcon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex-1 w-full min-h-[240px] flex flex-col justify-center">
        {total === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-[#F8FAFC] rounded-xl border border-dashed border-slate-200">
            <span className="text-xs font-semibold text-slate-500">
              No Risk Distribution Yet
            </span>
            <span className="text-[11px] text-slate-400 mt-1 max-w-xs">
              Scanned items will be categorized by risk level.
            </span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-1/2 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0];
                        const pct = ((item.value / total) * 100).toFixed(1);
                        return (
                          <div className="bg-[#064E3B] text-white text-xs px-3 py-2 rounded-xl shadow-lg border border-emerald-800">
                            <p className="font-semibold text-emerald-200">{item.name}</p>
                            <p className="font-bold text-white mt-0.5">
                              {item.value} ({pct}%)
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="w-full sm:w-1/2 space-y-2 text-left">
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/50 border border-emerald-100/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span className="text-xs font-medium text-slate-700">Low Risk</span>
                </div>
                <span className="text-xs font-bold text-emerald-800">
                  {safeCount} ({total > 0 ? ((safeCount / total) * 100).toFixed(0) : 0}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/50 border border-amber-100/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-xs font-medium text-slate-700">Medium Risk</span>
                </div>
                <span className="text-xs font-bold text-amber-800">
                  {mediumCount} ({total > 0 ? ((mediumCount / total) * 100).toFixed(0) : 0}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-rose-50/50 border border-rose-100/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="text-xs font-medium text-slate-700">High Risk</span>
                </div>
                <span className="text-xs font-bold text-rose-800">
                  {highCount} ({total > 0 ? ((highCount / total) * 100).toFixed(0) : 0}%)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

