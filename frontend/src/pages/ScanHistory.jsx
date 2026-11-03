import React, { useEffect, useState, useMemo } from 'react';
import {
  Trash2,
  Search,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import scamApi from '../api/scamApi';
import RiskBadge from '../components/common/RiskBadge';
import TypeBadge from '../components/common/TypeBadge';
import ScanDetailModal from '../components/common/ScanDetailModal';
import Toast from '../components/common/Toast';
import { normalizeRiskLevel, computeRiskScore } from '../utils/riskUtils';

export default function ScanHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [selectedScan, setSelectedScan] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null); // { message, type }

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await scamApi.getHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setError('Unable to load scan history. Ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDeleteOne = async (id) => {
    setDeletingId(id);
    try {
      await scamApi.deleteScan(id);
      setHistory((prev) => prev.filter((item) => (item._id || item.id) !== id));
      setToast({ message: 'Scan deleted successfully', type: 'success' });
    } catch (err) {
      console.error('Delete error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to delete scan record';
      setToast({ message: msg, type: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (history.length === 0) return;
    setLoading(true);
    try {
      await scamApi.clearHistory();
      setHistory([]);
      setToast({ message: 'Scan history cleared successfully', type: 'success' });
    } catch (err) {
      console.error('Clear history error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to clear scan history';
      setToast({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const itemType = String(item.type || '').toUpperCase();
      const matchesType =
        filterType === 'ALL' ||
        itemType === filterType ||
        (filterType === 'PHONE' && (itemType === 'PHONE' || String(item.content || '').includes('[Phone Number]')));
      const content = String(item.content || '').toLowerCase();
      const explanation = String(item.explanation || '').toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || content.includes(q) || explanation.includes(q);
      return matchesType && matchesSearch;
    });
  }, [history, filterType, searchQuery]);

  return (
    <div className="space-y-5 text-left">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <h2 className="text-lg font-semibold text-[#172B24] tracking-tight">
            Scan History
          </h2>
          <p className="text-xs text-slate-500">
            Audit log of previously analyzed URLs, messages, phone numbers, and offers
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={fetchHistory}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2E8F0] text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#059669]' : 'text-slate-400'}`} />
            <span>Refresh</span>
          </button>
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search payload or summary..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#172B24] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#059669] focus:border-[#059669]"
          />
        </div>

        {/* Filter Type Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0] self-start sm:self-auto">
          {['ALL', 'URL', 'MESSAGE', 'PHONE', 'OFFER'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                filterType === t
                  ? 'bg-white text-[#172B24] shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t === 'ALL' ? 'All' : t === 'PHONE' ? 'Phone' : t}
            </button>
          ))}
        </div>
      </div>

      {/* History Table Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-xs text-slate-500">
            <RefreshCw className="w-5 h-5 animate-spin text-[#059669] mx-auto mb-2" />
            <span>Loading records...</span>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No scan records found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-4 w-24">Type</th>
                  <th className="py-2.5 px-4">Content</th>
                  <th className="py-2.5 px-4 w-28">Risk Score</th>
                  <th className="py-2.5 px-4 w-32">Classification</th>
                  <th className="py-2.5 px-4 w-36">Date</th>
                  <th className="py-2.5 px-4 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs">
                {filteredHistory.map((scan) => {
                  const date = scan.createdAt
                    ? new Date(scan.createdAt).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })
                    : 'Recent';

                  const isDeleting = deletingId === (scan._id || scan.id);
                  const normalizedRisk = normalizeRiskLevel(scan.riskLevel);
                  const reasons = Array.isArray(scan.reasons) ? scan.reasons : [];
                  const score = scan.riskScore || computeRiskScore(scan.riskLevel, reasons);

                  const displayType =
                    scan.type === 'MESSAGE' && String(scan.content || '').includes('[Phone Number]')
                      ? 'PHONE'
                      : scan.type;

                  return (
                    <tr key={scan._id || scan.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <TypeBadge type={displayType} />
                      </td>
                      <td className="py-3 px-4 max-w-xs sm:max-w-md">
                        <p className="font-mono text-slate-800 text-[11px] truncate" title={scan.content}>
                          {scan.content}
                        </p>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-xs text-[#172B24]">
                          {score}
                        </span>
                        <span className="text-[10px] text-slate-400">/100</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <RiskBadge riskLevel={normalizedRisk} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                        {date}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setSelectedScan({ ...scan, type: displayType, riskScore: score })}
                          className="text-xs font-medium text-[#059669] hover:text-[#047857] hover:underline"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteOne(scan._id || scan.id)}
                          disabled={isDeleting}
                          className="text-xs font-medium text-slate-400 hover:text-rose-600 disabled:opacity-50"
                          title="Delete"
                        >
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inspect Modal */}
      <ScanDetailModal
        scan={selectedScan}
        isOpen={!!selectedScan}
        onClose={() => setSelectedScan(null)}
      />
    </div>
  );
}
