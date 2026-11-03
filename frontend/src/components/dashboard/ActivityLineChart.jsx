import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export default function ActivityLineChart({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-[#172B24] uppercase tracking-wider">
          Scan Activity
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Scan volume over recent timeline
        </p>
      </div>

      <div className="flex-1 w-full min-h-[220px]">
        {!hasData ? (
          <div className="h-full flex items-center justify-center p-6 text-center border border-dashed border-slate-200 rounded-lg">
            <span className="text-xs text-slate-400">
              No scan activity recorded yet.
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
                allowDecimals={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#172B24] text-white text-xs px-2.5 py-1.5 rounded shadow-sm">
                        <span className="text-slate-300 mr-2">{label}:</span>
                        <span className="font-semibold text-white">{payload[0].value} scans</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 3, fill: '#059669', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#059669' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

