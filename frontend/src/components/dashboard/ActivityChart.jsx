import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Activity } from 'lucide-react';

export default function ActivityChart({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#172B24] tracking-tight">
            Threat & Scan Activity
          </h3>
          <p className="text-xs text-slate-400">
            Real-time volume over recent timeline
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center border border-emerald-100">
          <Activity className="w-4 h-4" />
        </div>
      </div>

      <div className="flex-1 w-full min-h-[240px]">
        {!hasData ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-[#F8FAFC] rounded-xl border border-dashed border-slate-200">
            <span className="text-xs font-semibold text-slate-500">
              No Scan Timeline Available
            </span>
            <span className="text-[11px] text-slate-400 mt-1 max-w-xs">
              Perform scans to populate chronological detection trends.
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="date"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#064E3B] text-white text-xs px-3 py-2 rounded-xl shadow-lg border border-emerald-800">
                        <p className="font-semibold text-emerald-200">{label}</p>
                        <p className="font-bold text-white mt-0.5">
                          {payload[0].value} {payload[0].value === 1 ? 'Scan' : 'Scans'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#059669"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#emeraldGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

