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

  const accentColor = '#3B76A6';
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
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Expanded Modal Content */}
      <motion.div
        layoutId="profile-card-container-codeforces"
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-black/10 shadow-2xl p-5 sm:p-7 md:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Platform, Handle & Close */}
        <div className="flex items-start justify-between gap-4 border-b border-black/8 pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#3B76A6] font-semibold">
                Codeforces
              </span>
              <span className="text-[#8C959F] text-xs">•</span>
              <span className="text-xs font-mono text-[#57606A]">
                Official API v2
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h2 id="cf-modal-title" className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
                @{data?.handle || 'manavp8'}
              </h2>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-black/10 text-[#57606A] hover:text-[#171717] hover:bg-[#F7F6F2] transition-colors"
                title="Open Codeforces profile"
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
            <RefreshCw className="w-6 h-6 animate-spin text-[#3B76A6]" />
            <p className="text-xs font-mono text-[#57606A]">
              Connecting to Codeforces REST API...
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
                  Current Rating
                </span>
                <span className="text-2xl font-black font-mono text-[#3B76A6]">
                  {data.rating}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F6F2] border border-black/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
                  Peak Rating
                </span>
                <span className="text-2xl font-black font-mono text-[#171717]">
                  {data.maxRating}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F6F2] border border-black/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
                  Rank Badge
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-[#3B76A6] block mt-1">
                  {data.rank}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F6F2] border border-black/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
                  Total Contests
                </span>
                <span className="text-2xl font-black font-mono text-[#171717]">
                  {data.contestsCount}
                </span>
              </div>
            </div>

            {/* Rating History Graph Container */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#F7F6F2] border border-black/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#3B76A6]" />
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#171717]">
                    Rating Trajectory ({graphPoints.length} Contests)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#8C959F]">
                  PEAK: {data.maxRating}
                </span>
              </div>

              <RatingGraph points={graphPoints} accentColor={accentColor} />
            </div>

            {/* Recent Contests List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#57606A] font-semibold">
                  Recent Contest Submissions
                </h3>
                <span className="text-[10px] font-mono text-[#8C959F]">
                  Showing last {Math.min(data.history.length, 5)}
                </span>
              </div>

              <div className="space-y-2">
                {data.history.slice(-5).reverse().map((contest) => {
                  const delta = contest.newRating - contest.oldRating;
                  return (
                    <div
                      key={contest.contestId}
                      className="p-3 rounded-lg bg-[#F7F6F2] border border-black/5 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="min-w-0 pr-3">
                        <p className="font-medium text-[#171717] truncate">
                          {contest.contestName}
                        </p>
                        <p className="text-[10px] text-[#8C959F] mt-0.5">
                          Rank #{contest.rank}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-[#171717] font-bold">
                          {contest.newRating}
                        </span>
                        <span
                          className={`ml-2 font-semibold ${
                            delta >= 0 ? 'text-[#4E8752]' : 'text-[#C85A48]'
                          }`}
                        >
                          {delta >= 0 ? `+${delta}` : delta}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Freshness & Refresh Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-black/5 text-[11px] font-mono text-[#8C959F]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E8752]" />
                Live API feed · Cached 10m
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

export default CodeforcesDetailModal;
