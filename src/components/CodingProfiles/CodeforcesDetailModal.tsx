import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, RefreshCw, ExternalLink, AlertCircle, Calendar } from 'lucide-react';
import { useCodeforcesProfile } from '../../services/codeforces';
import RatingGraph from './RatingGraph';
import type { GraphPoint } from '../../types/coding';

interface CodeforcesDetailModalProps {
  onClose: () => void;
}

export const CodeforcesDetailModal: React.FC<CodeforcesDetailModalProps> = ({ onClose }) => {
  const { data, loading, error, refresh } = useCodeforcesProfile(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const accentColor = '#4B88E4';
  const profileUrl = 'https://codeforces.com/profile/manavp8';

  // Transform contest history to graph points
  const graphPoints: GraphPoint[] = (data?.history || []).map((c) => {
    const dateStr = new Date(c.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return {
      id: c.contestId,
      title: c.contestName,
      date: dateStr,
      rating: c.newRating,
      oldRating: c.oldRating,
      delta: c.newRating - c.oldRating,
      rank: c.rank,
    };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cf-modal-title"
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
        layoutId="profile-card-container-codeforces"
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0F1116] border border-[#222733] shadow-2xl p-5 sm:p-7 md:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Platform, Handle & Close */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4B88E4]">
                Codeforces
              </span>
              <span className="text-[#D7E2EA]/30 text-xs">•</span>
              <span className="text-xs font-mono text-[#D7E2EA]/50">
                Official REST API
              </span>
            </div>
            <h2 id="cf-modal-title" className="text-2xl sm:text-3xl font-bold text-[#D7E2EA]">
              @manavp8
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
              <ExternalLink className="w-3.5 h-3.5 text-[#4B88E4]" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close Codeforces profile modal"
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
            <div className="h-52 bg-white/[0.03] rounded-xl border border-white/5" />
            <div className="h-40 bg-white/[0.03] rounded-xl border border-white/5" />
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
              className="px-4 py-2 rounded-lg bg-[#4B88E4]/20 hover:bg-[#4B88E4]/30 border border-[#4B88E4]/40 text-xs font-mono text-[#D7E2EA] transition-colors"
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
                  Current Rating
                </span>
                <span className="text-2xl font-black font-mono text-[#4B88E4] mt-0.5 block">
                  {data.rating}
                </span>
                <span className="text-[11px] text-[#D7E2EA]/50 font-mono">
                  {data.rank}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/40 block">
                  Peak Rating
                </span>
                <span className="text-2xl font-black font-mono text-[#D7E2EA] mt-0.5 block">
                  {data.maxRating}
                </span>
                <span className="text-[11px] text-[#D7E2EA]/50 font-mono">
                  {data.maxRank}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/40 block">
                  Contests
                </span>
                <span className="text-2xl font-black font-mono text-[#D7E2EA] mt-0.5 block">
                  {data.contestsCount}
                </span>
                <span className="text-[11px] text-[#D7E2EA]/50 font-mono">
                  Participated
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/40 block">
                  Best Rank
                </span>
                <span className="text-2xl font-black font-mono text-[#D7E2EA] mt-0.5 block">
                  #{data.bestRank > 0 ? data.bestRank : '—'}
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">
                  Recent: {data.recentDelta >= 0 ? `+${data.recentDelta}` : data.recentDelta}
                </span>
              </div>
            </div>

            {/* 2. Rating History Graph — Visual Centerpiece */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/80 font-semibold">
                    Rating Progression History
                  </h3>
                  <p className="text-[11px] text-[#D7E2EA]/45 font-light">
                    Plotting all {graphPoints.length} verified contest rating changes chronologically.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#D7E2EA]/40 hidden sm:inline">
                  Hover points for details
                </span>
              </div>

              <RatingGraph points={graphPoints} accentColor={accentColor} minYPadding={80} height={190} />
            </div>

            {/* 3. Recent Contests List */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/80 font-semibold mb-2.5">
                Recent Contest Performances
              </h3>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {[...data.history].reverse().slice(0, 5).map((c) => {
                  const delta = c.newRating - c.oldRating;
                  const dateStr = new Date(c.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <div
                      key={c.contestId}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs font-mono"
                    >
                      <div className="truncate pr-3">
                        <span className="text-[#D7E2EA] font-normal block truncate">
                          {c.contestName}
                        </span>
                        <span className="text-[10px] text-[#D7E2EA]/40 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-2.5 h-2.5" /> {dateStr}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span
                          className={`text-xs font-semibold ${
                            delta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {delta >= 0 ? `+${delta}` : delta}
                        </span>
                        <span className="text-[#4B88E4] font-semibold min-w-[50px] text-right">
                          #{c.rank}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
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

export default CodeforcesDetailModal;
