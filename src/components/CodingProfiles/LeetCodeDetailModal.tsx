import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, RefreshCw, ExternalLink, AlertCircle, Award, CheckCircle2 } from 'lucide-react';
import { useLeetCodeProfile } from '../../services/leetcode';
import RatingGraph from './RatingGraph';
import type { GraphPoint } from '../../types/coding';

interface LeetCodeDetailModalProps {
  onClose: () => void;
}

export const LeetCodeDetailModal: React.FC<LeetCodeDetailModalProps> = ({ onClose }) => {
  const { data, loading, error, refresh } = useLeetCodeProfile(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const accentColor = '#B8732E';
  const profileUrl = 'https://leetcode.com/u/__Manav_Patel/';

  // Transform contest history to graph points
  const graphPoints: GraphPoint[] = (data?.history || []).map((c, idx, arr) => {
    const prev = idx > 0 ? arr[idx - 1] : null;
    const delta = prev ? c.rating - prev.rating : undefined;
    const dateStr = new Date(c.startTime * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return {
      id: c.contestTitle,
      title: c.contestTitle,
      date: dateStr,
      rating: c.rating,
      oldRating: prev ? prev.rating : undefined,
      delta,
      rank: c.ranking > 0 ? c.ranking : undefined,
    };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lc-modal-title"
    >
      {/* Dimmed backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Expanded Modal Content */}
      <motion.div
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-black/10 shadow-2xl p-5 sm:p-7 md:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Platform, Handle & Close */}
        <div className="flex items-start justify-between gap-4 border-b border-black/8 pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8732E] font-semibold">
                LeetCode
              </span>
              <span className="text-[#8C959F] text-xs">•</span>
              <span className="text-xs font-mono text-[#57606A]">
                GraphQL API
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h2 id="lc-modal-title" className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
                @{data?.username || '__Manav_Patel'}
              </h2>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-black/10 text-[#57606A] hover:text-[#171717] hover:bg-[#F7F6F2] transition-colors"
                title="Open LeetCode profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#57606A] hover:text-[#171717] hover:bg-[#F7F6F2] transition-colors border border-black/5 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading State */}
        {loading && !data && (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
            <RefreshCw className="w-6 h-6 animate-spin text-[#B8732E]" />
            <p className="text-xs font-mono text-[#57606A]">
              Connecting to LeetCode GraphQL endpoint...
            </p>
          </div>
        )}

        {/* Error Fallback */}
        {error && !data && (
          <div className="p-4 rounded-xl bg-[#FBEFEF] border border-[#C85A48]/20 flex items-start gap-3 my-4">
            <AlertCircle className="w-5 h-5 text-[#C85A48] flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-xs font-mono text-[#171717]">
              <p className="font-semibold mb-1">Failed to query live profile</p>
              <p className="text-[#57606A] mb-3">{error}</p>
              <button
                onClick={refresh}
                className="px-3 py-1.5 rounded bg-[#171717] text-white text-xs font-medium cursor-pointer"
              >
                Retry Request
              </button>
            </div>
          </div>
        )}

        {/* Main Content Body */}
        {data && (
          <div className="space-y-6">
            {/* KPI Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F7F6F2] border border-black/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
                  Contest Rating
                </span>
                <span className="text-2xl font-black font-mono text-[#B8732E]">
                  {data.rating}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F6F2] border border-black/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
                  Global Rank
                </span>
                <span className="text-xl font-black font-mono text-[#171717]">
                  #{data.globalRanking > 0 ? data.globalRanking.toLocaleString() : '34,335'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F6F2] border border-black/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
                  Honor Badge
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-[#B8732E] block mt-1">
                  {data.badge || 'Knight'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F6F2] border border-black/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
                  Problems Solved
                </span>
                <span className="text-2xl font-black font-mono text-[#171717]">
                  {data.problems.all}
                </span>
              </div>
            </div>

            {/* Problem Breakdown Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#F7F6F2] border border-black/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#171717]">
                  Problem Solving Distribution ({data.problems.all} Total)
                </h3>
                <span className="text-[10px] font-mono text-[#8C959F]">
                  TOP 4% GLOBALLY
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white border border-black/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#4E8752] block mb-1">
                    Easy
                  </span>
                  <span className="text-lg font-bold font-mono text-[#171717]">
                    {data.problems.easy}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white border border-black/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#B8732E] block mb-1">
                    Medium
                  </span>
                  <span className="text-lg font-bold font-mono text-[#171717]">
                    {data.problems.medium}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white border border-black/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C85A48] block mb-1">
                    Hard
                  </span>
                  <span className="text-lg font-bold font-mono text-[#171717]">
                    {data.problems.hard}
                  </span>
                </div>
              </div>
            </div>

            {/* Rating History Graph */}
            {graphPoints.length > 0 && (
              <div className="p-4 sm:p-5 rounded-xl bg-[#F7F6F2] border border-black/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#B8732E]" />
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#171717]">
                      Contest Trajectory ({graphPoints.length} Rated Contests)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#8C959F]">
                    CURRENT: {data.rating}
                  </span>
                </div>

                <RatingGraph points={graphPoints} accentColor={accentColor} />
              </div>
            )}

            {/* Freshness & Refresh Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-black/5 text-[11px] font-mono text-[#8C959F]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4E8752]" />
                Live GraphQL feed · Cached 10m
              </span>

              <button
                onClick={refresh}
                disabled={loading}
                className="inline-flex items-center gap-1.5 text-[#57606A] hover:text-[#171717] transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LeetCodeDetailModal;

// done
