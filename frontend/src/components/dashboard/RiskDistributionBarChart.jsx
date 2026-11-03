import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

export default function RiskDistributionBarChart({ safeCount = 0, mediumCount = 0, highCount = 0 }) {
  const total = safeCount + mediumCount + highCount;

  const data = [
    { name: 'Low Risk', count: safeCount, color: '#059669' },
    { name: 'Medium Risk', count: mediumCount, color: '#D97706' },
    { name: 'High Risk', count: highCount, color: '#DC2626' },
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-[#172B24] uppercase tracking-wider">
          Risk Distribution
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Breakdown of analyzed threat severities
        </p>
      </div>

      <div className="flex-1 w-full min-h-[220px]">
        {total === 0 ? (
          <div className="h-full flex items-center justify-center p-6 text-center border border-dashed border-slate-200 rounded-lg">
            <span className="text-xs text-slate-400">
              No risk telemetry available yet.
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 25, left: 15, bottom: 0 }}
            >
              <CartesianGrid stroke="#F1F5F9" horizontal={false} />
              <XAxis
                type="number"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
                width={85}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    const pct = total > 0 ? ((item.count / total) * 100).toFixed(0) : 0;
                    return (
                      <div className="bg-[#172B24] text-white text-xs px-2.5 py-1.5 rounded shadow-sm">
                        <span className="text-slate-300 mr-2">{item.name}:</span>
                        <span className="font-semibold text-white">
                          {item.count} ({pct}%)
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18}>
                {data.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

