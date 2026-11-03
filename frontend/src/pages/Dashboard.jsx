import React, { useEffect, useState, useMemo } from 'react';
import { Shield, ShieldCheck, AlertTriangle, ShieldAlert, RefreshCw, AlertCircle } from 'lucide-react';
import scamApi from '../api/scamApi';
import StatCard from '../components/dashboard/StatCard';
import ActivityLineChart from '../components/dashboard/ActivityLineChart';
import RiskDistributionBarChart from '../components/dashboard/RiskDistributionBarChart';
import RecentScansTable from '../components/dashboard/RecentScansTable';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await scamApi.getHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
      setError('Unable to connect to backend service. Please ensure the server is active.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Compute Real Statistics from actual backend data
  const metrics = useMemo(() => {
    const total = history.length;
    let safe = 0;
    let medium = 0;
    let high = 0;

    history.forEach((scan) => {
      const risk = String(scan.riskLevel || '').toUpperCase();
      if (risk === 'LOW' || risk.includes('SAFE')) {
        safe += 1;
      } else if (risk === 'HIGH' || risk.includes('DANGER') || risk.includes('SCAM')) {
        high += 1;
      } else {
        medium += 1;
      }
    });

    return {
      total,
      safe,
      medium,
      high,
      safePct: total > 0 ? Math.round((safe / total) * 100) : 0,
      mediumPct: total > 0 ? Math.round((medium / total) * 100) : 0,
      highPct: total > 0 ? Math.round((high / total) * 100) : 0,
    };
  }, [history]);

  // Aggregate Real Timeline Activity for Line Chart
  const activityData = useMemo(() => {
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

    return Object.entries(grouped).map(([date, count]) => ({
      date,
      count,
    }));
  }, [history]);

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
        <div>
          <h2 className="text-lg font-semibold text-[#172B24] tracking-tight">
            Security Overview
          </h2>
          <p className="text-xs text-slate-500">
            Real-time threat monitoring and scan analytics
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#059669]' : 'text-slate-400'}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Backend Communication Alert */}
      {error && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between text-xs text-rose-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchDashboardData}
            className="text-xs font-semibold text-rose-700 hover:underline ml-4"
          >
            Retry
          </button>
        </div>
      )}

      {/* Statistics Cards (Show only 4 required KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Scans"
          value={metrics.total}
          icon={Shield}
          variant="default"
        />
        <StatCard
          title="Safe Scans"
          value={metrics.safe}
          subtext={`${metrics.safePct}% of total`}
          icon={ShieldCheck}
          variant="safe"
        />
        <StatCard
          title="Medium Risk"
          value={metrics.medium}
          subtext={`${metrics.mediumPct}% of total`}
          icon={AlertTriangle}
          variant="medium"
        />
        <StatCard
          title="High Risk"
          value={metrics.high}
          subtext={`${metrics.highPct}% of total`}
          icon={ShieldAlert}
          variant="danger"
        />
      </div>

      {/* Charts Grid: Line Chart + Horizontal Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <ActivityLineChart data={activityData} />
        </div>
        <div>
          <RiskDistributionBarChart
            safeCount={metrics.safe}
            mediumCount={metrics.medium}
            highCount={metrics.high}
          />
        </div>
      </div>

      {/* Recent Scans Table */}
      <div>
        <RecentScansTable scans={history} />
      </div>
    </div>
  );
}
