import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RiskBadge from '../common/RiskBadge';
import TypeBadge from '../common/TypeBadge';
import ScanDetailModal from '../common/ScanDetailModal';
import { normalizeRiskLevel } from '../../utils/riskUtils';

export default function RecentScansTable({ scans = [] }) {
  const [selectedScan, setSelectedScan] = useState(null);

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* Table Header */}
      <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold text-[#172B24] uppercase tracking-wider">
            Recent Scans
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Latest analyzed URLs, messages, phone numbers, and offers
          </p>
        </div>
        <Link
          to="/history"
          className="text-xs font-medium text-[#059669] hover:text-[#047857] hover:underline transition-colors"
        >
          View all scans →
        </Link>
      </div>

      {/* Table Content */}
      {scans.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-400">
          No recent scans recorded. Use a scanner to analyze suspicious content.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-5 w-24">Scan Type</th>
                <th className="py-2.5 px-5">Submitted Content</th>
                <th className="py-2.5 px-5 w-32">Risk Level</th>
                <th className="py-2.5 px-5 w-36">Date</th>
                <th className="py-2.5 px-5 text-right w-20">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {scans.slice(0, 6).map((scan) => {
                const date = scan.createdAt
                  ? new Date(scan.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Recent';

                const displayType =
                  scan.type === 'MESSAGE' && String(scan.content || '').includes('[Phone Number]')
                    ? 'PHONE'
                    : scan.type;

                const normalizedRisk = normalizeRiskLevel(scan.riskLevel);

                return (
                  <tr key={scan._id || scan.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-5">
                      <TypeBadge type={displayType} />
                    </td>
                    <td className="py-3 px-5 max-w-xs sm:max-w-md">
                      <p className="font-mono text-slate-800 text-[11px] truncate" title={scan.content}>
                        {scan.content}
                      </p>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <RiskBadge riskLevel={normalizedRisk} size="sm" />
                    </td>
                    <td className="py-3 px-5 text-slate-400 whitespace-nowrap font-medium text-[11px]">
                      {date}
                    </td>
                    <td className="py-3 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedScan({ ...scan, type: displayType })}
                        className="text-xs font-medium text-[#059669] hover:text-[#047857] hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Inspect Modal */}
      <ScanDetailModal
        scan={selectedScan}
        isOpen={!!selectedScan}
        onClose={() => setSelectedScan(null)}
      />
    </div>
  );
}
