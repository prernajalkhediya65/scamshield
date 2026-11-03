import React, { useEffect, useState, useMemo } from 'react';
import { RefreshCw, BarChart2, ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
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
import scamApi from '../api/scamApi';
import ActivityLineChart from '../components/dashboard/ActivityLineChart';
import RiskDistributionBarChart from '../components/dashboard/RiskDistributionBarChart';

export default function Analytics() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await scamApi.getHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Analytics load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const total = history.length;
    let safe = 0;
    let medium = 0;
    let high = 0;

    let urlCount = 0;
    let msgCount = 0;
    let phoneCount = 0;
    let offerCount = 0;

    history.forEach((s) => {
      const risk = String(s.riskLevel || '').toUpperCase();
      if (risk === 'LOW' || risk.includes('SAFE')) safe++;
      else if (risk === 'HIGH' || risk.includes('DANGER') || risk.includes('SCAM')) high++;
      else medium++;

      const type = String(s.type || '').toUpperCase();
      if (type === 'PHONE' || (type === 'MESSAGE' && String(s.content || '').includes('[Phone Number]'))) {
        phoneCount++;
      } else if (type === 'URL') {
        urlCount++;
      } else if (type === 'MESSAGE') {
        msgCount++;
      } else if (type === 'OFFER') {
        offerCount++;
      }
    });

    const threatRate = total > 0 ? (((medium + high) / total) * 100).toFixed(1) : 0;
    const cleanRate = total > 0 ? ((safe / total) * 100).toFixed(1) : 0;

    return {
      total,
      safe,
      medium,
      high,
      threatRate,
      cleanRate,
      typeData: [
        { name: 'URLs', count: urlCount, color: '#3B82F6' },
        { name: 'Messages', count: msgCount, color: '#8B5CF6' },
        { name: 'Phone', count: phoneCount, color: '#0EA5E9' },
        { name: 'Offers', count: offerCount, color: '#059669' },
      ],
    };
  }, [history]);

  const timelineData = useMemo(() => {
    if (history.length === 0) return [];
    const grouped = {};
    history.forEach((scan) => {
      const dateStr = scan.createdAt
        ? new Date(scan.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })
        : 'Recent';
      grouped[dateStr] = (grouped[dateStr] || 0) + 1;
    });
    return Object.entries(grouped).map(([date, count]) => ({ date, count }));
  }, [history]);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div>
          <h2 className="text-lg font-semibold text-[#172B24] tracking-tight">
            Threat Analytics
          </h2>
          <p className="text-xs text-slate-500">
            Telemetry metrics and modality breakdown
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#059669]' : 'text-slate-400'}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Analytics KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Total Telemetry Events
          </span>
          <span className="text-2xl font-bold text-[#172B24]">
            {stats.total}
          </span>
          <p className="text-[11px] text-slate-400 mt-1">
            Cumulative across all active scanners
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Confirmed Threat Rate
          </span>
          <span className="text-2xl font-bold text-rose-600">
            {stats.threatRate}%
          </span>
          <p className="text-[11px] text-slate-400 mt-1">
            Scans identified as Suspicious or Dangerous
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Verified Clean Rate
          </span>
          <span className="text-2xl font-bold text-[#059669]">
            {stats.cleanRate}%
          </span>
          <p className="text-[11px] text-slate-400 mt-1">
            Payloads classified as SAFE
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityLineChart data={timelineData} />
        <RiskDistributionBarChart
          safeCount={stats.safe}
          mediumCount={stats.medium}
          highCount={stats.high}
        />
      </div>

      {/* Modality Breakdown Bar Chart */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-[#172B24] uppercase tracking-wider">
            Scans by Modality
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Distribution across URLs, Messages, Phone numbers, and Offers
          </p>
        </div>

        {stats.total === 0 ? (
          <div className="h-48 flex items-center justify-center text-xs text-slate-400">
            No telemetry data recorded yet.
          </div>
        ) : (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.typeData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="name"
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
                  cursor={{ fill: '#F8FAFC' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#172B24] text-white text-xs px-2.5 py-1.5 rounded shadow-lg">
                          <p className="font-semibold">{payload[0].payload.name}</p>
                          <p className="text-emerald-300 font-mono">
                            {payload[0].value} scans
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={36}>
                  {stats.typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
