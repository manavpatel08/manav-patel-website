import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface CompactProfileTileProps {
  platformId: 'codeforces' | 'leetcode';
  platformName: string;
  handle: string;
  rating: number;
  rank: string;
  isLive: boolean;
  accentColor: string;
  accentBg: string;
  onClick: () => void;
}

// Clean Monochromatic / Solid Platform SVGs
const PlatformIcon: React.FC<{ platformId: string; color: string }> = ({ platformId, color }) => {
  if (platformId === 'codeforces') {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="12" width="4" height="9" rx="1" fill="#EAB308" />
        <rect x="10" y="5" width="4" height="16" rx="1" fill={color} />
        <rect x="17" y="9" width="4" height="12" rx="1" fill="#EF4444" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.261a3.67 3.67 0 0 0-.996 2.532 3.69 3.69 0 0 0 1.05 2.59l4.57 4.57a1.38 1.38 0 0 0 1.948 0 1.376 1.376 0 0 0 0-1.95l-4.57-4.57a.936.936 0 0 1-.269-.64.93.93 0 0 1 .253-.642L14.51 2.378a1.37 1.37 0 0 0-.066-1.94A1.36 1.36 0 0 0 13.483 0zm-2.88 7.39a1.39 1.39 0 0 0-1.39 1.39v.01a1.39 1.39 0 0 0 1.39 1.39h8.34a1.39 1.39 0 0 0 1.39-1.39v-.01a1.39 1.39 0 0 0-1.39-1.39h-8.34zm-1.04 8.24a1.38 1.38 0 0 0 0 1.95l5.4 5.4a1.37 1.37 0 0 0 1.95 0 1.38 1.38 0 0 0 0-1.95l-5.4-5.4a1.38 1.38 0 0 0-1.95 0z"
        fill={color}
      />
    </svg>
  );
};

export const CompactProfileTile: React.FC<CompactProfileTileProps> = ({
  platformId,
  platformName,
  handle,
  rating,
  rank,
  isLive,
  accentColor,
  accentBg,
  onClick,
}) => {
  const isCF = platformId === 'codeforces';

  return (
    <motion.div
      layoutId={`profile-card-container-${platformId}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`Open ${platformName} profile details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="group relative w-full text-left rounded-2xl p-6 cursor-pointer select-none transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-white/20"
      style={{
        background: isCF ? '#101217' : '#141210',
        border: `1px solid ${isCF ? 'rgba(75, 136, 228, 0.18)' : 'rgba(229, 138, 43, 0.18)'}`,
      }}
    >
      {/* Top row: Platform Brand + Live Badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border"
            style={{
              background: accentBg,
              borderColor: `${accentColor}30`,
            }}
          >
            <PlatformIcon platformId={platformId} color={accentColor} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#D7E2EA] tracking-wide uppercase leading-none">
              {platformName}
            </h3>
            <span className="text-xs font-mono text-[#D7E2EA]/50 block mt-1">
              @{handle}
            </span>
          </div>
        </div>

        {/* Live Indicator Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-[#D7E2EA]/60">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isLive ? 'bg-emerald-400' : 'bg-white/40'
            }`}
          />
          <span>{isLive ? 'Live' : 'Synced'}</span>
        </div>
      </div>

      {/* Hero Metric: Rating + Rank */}
      <div className="flex items-end justify-between py-2 border-t border-white/[0.06] mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/40 block mb-1">
            Rating
          </span>
          <span
            className="text-3xl sm:text-4xl font-black font-mono tracking-tight leading-none"
            style={{ color: accentColor }}
          >
            {rating > 0 ? rating : '—'}
          </span>
        </div>

        <div className="text-right pb-0.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/40 block mb-1">
            Rank
          </span>
          <span
            className="inline-block px-2.5 py-0.5 rounded text-xs font-medium tracking-wide uppercase border"
            style={{
              background: accentBg,
              color: accentColor,
              borderColor: `${accentColor}35`,
            }}
          >
            {rank || 'Unrated'}
          </span>
        </div>
      </div>

      {/* Bottom CTA affordance */}
      <div className="flex items-center justify-between pt-1 text-xs font-mono text-[#D7E2EA]/45 group-hover:text-[#D7E2EA]/75 transition-colors">
        <span>Click to view profile & history</span>
        <div className="flex items-center gap-1 transition-transform group-hover:translate-x-0.5">
          <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accentColor }} />
        </div>
      </div>
    </motion.div>
  );
};

export default CompactProfileTile;
