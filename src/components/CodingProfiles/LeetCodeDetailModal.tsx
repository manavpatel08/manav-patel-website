import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react';
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

  const accentColor = '#E58A2B';
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
        className="absolute inset-0 bg-black/75 transition-opacity"
      />

      {/* Expanded Modal Content */}
      <motion.div
        layoutId="profile-card-container-leetcode"
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#141210] border border-[#2F2720] shadow-2xl p-5 sm:p-7 md:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Platform, Handle & Close */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E58A2B]">
                LeetCode
              </span>
              <span className="text-[#D7E2EA]/30 text-xs">•</span>
              <span className="text-xs font-mono text-[#D7E2EA]/50">
                Official GraphQL API
              </span>
            </div>
            <h2 id="lc-modal-title" className="text-2xl sm:text-3xl font-bold text-[#D7E2EA]">
              @{data?.username || '__Manav_Patel'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] text-xs font-mono text-[#D7E2EA]/70 hover:text-white transition-colors"
            >
              <span>Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#E58A2B]" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close LeetCode profile modal"
              className="p-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.08] text-[#D7E2EA]/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading State Skeleton */}
        {loading && !data && (
          <div className="py-12 space-y-6 animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-white/[0.03] rounded-xl border border-white/5" />
              ))}
            </div>
            <div className="h-44 bg-white/[0.03] rounded-xl border border-white/5" />
            <div className="h-44 bg-white/[0.03] rounded-xl border border-white/5" />
          </div>
        )}

        {/* Error State with Retry Button */}
        {error && !data && (
          <div className="py-12 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <p className="text-sm text-[#D7E2EA]/70">
              Unable to fetch live profile data right now.
            </p>
            <button
              onClick={() => refresh()}
              className="px-4 py-2 rounded-lg bg-[#E58A2B]/20 hover:bg-[#E58A2B]/30 border border-[#E58A2B]/40 text-xs font-mono text-[#D7E2EA] transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Loaded Profile Content */}
        {data && (
          <div className="space-y-6">
            {/* 1. Key Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/40 block">
                  Contest Rating
                </span>
                <span className="text-2xl font-black font-mono text-[#E58A2B] mt-0.5 block">
                  {data.rating}
                </span>
                <span className="text-[11px] text-[#D7E2EA]/50 font-mono">
                  {data.badge || 'Knight'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/40 block">
                  Global Rank
                </span>
                <span className="text-2xl font-black font-mono text-[#D7E2EA] mt-0.5 block">
                  #{data.globalRanking.toLocaleString()}
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">
                  Top {data.topPercentage}%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/40 block">
                  Problems Solved
                </span>
                <span className="text-2xl font-black font-mono text-[#D7E2EA] mt-0.5 block">
                  {data.problems.all}
                </span>
                <span className="text-[11px] text-[#D7E2EA]/50 font-mono">
                  Total Solved
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/40 block">
                  Contests
                </span>
                <span className="text-2xl font-black font-mono text-[#D7E2EA] mt-0.5 block">
                  {data.attendedContestsCount}
                </span>
                <span className="text-[11px] text-[#D7E2EA]/50 font-mono">
                  Attended
                </span>
              </div>
            </div>

            {/* 2. Problem-Solving Distribution (Solid-color breakdown) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/80 font-semibold">
                  Problem-Solving Distribution
                </h3>
                <span className="text-xs font-mono text-[#D7E2EA]/50">
                  {data.problems.all} Total
                </span>
              </div>

              {/* Progress stack */}
              <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden flex mb-4">
                <div
                  style={{ width: `${(data.problems.easy / (data.problems.all || 1)) * 100}%` }}
                  className="bg-emerald-500 transition-all duration-500"
                  title={`Easy: ${data.problems.easy}`}
                />
                <div
                  style={{ width: `${(data.problems.medium / (data.problems.all || 1)) * 100}%` }}
                  className="bg-amber-500 transition-all duration-500"
                  title={`Medium: ${data.problems.medium}`}
                />
                <div
                  style={{ width: `${(data.problems.hard / (data.problems.all || 1)) * 100}%` }}
                  className="bg-rose-500 transition-all duration-500"
                  title={`Hard: ${data.problems.hard}`}
                />
              </div>

              {/* Difficulty counts */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-emerald-400 block text-[11px] uppercase tracking-wider">
                    Easy
                  </span>
                  <span className="text-base font-bold text-white mt-0.5 block">
                    {data.problems.easy}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <span className="text-amber-400 block text-[11px] uppercase tracking-wider">
                    Medium
                  </span>
                  <span className="text-base font-bold text-white mt-0.5 block">
                    {data.problems.medium}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <span className="text-rose-400 block text-[11px] uppercase tracking-wider">
                    Hard
                  </span>
                  <span className="text-base font-bold text-white mt-0.5 block">
                    {data.problems.hard}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Contest Rating Progression Graph */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/80 font-semibold">
                    Contest Rating History
                  </h3>
                  <p className="text-[11px] text-[#D7E2EA]/45 font-light">
                    Real rating progression across {graphPoints.length} attended contests.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#D7E2EA]/40 hidden sm:inline">
                  Hover points for details
                </span>
              </div>

              <RatingGraph points={graphPoints} accentColor={accentColor} minYPadding={60} height={180} />
            </div>

            {/* 4. Bottom Data Freshness & Manual Refresh */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono text-[#D7E2EA]/45">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Live data synced: {data.lastUpdated}</span>
              </div>

              <button
                onClick={() => refresh()}
                disabled={loading}
                className="flex items-center gap-1.5 text-xs text-[#D7E2EA]/60 hover:text-white transition-colors disabled:opacity-40"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LeetCodeDetailModal;
