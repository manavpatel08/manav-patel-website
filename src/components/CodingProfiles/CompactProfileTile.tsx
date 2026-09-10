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

// Clean Platform Icons
const PlatformIcon: React.FC<{ platformId: string; color: string }> = ({ platformId, color }) => {
  if (platformId === 'codeforces') {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="12" width="4" height="9" rx="1" fill="#B8732E" />
        <rect x="10" y="5" width="4" height="16" rx="1" fill={color} />
        <rect x="17" y="9" width="4" height="12" rx="1" fill="#C85A48" />
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
  return (
    <motion.div
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
      className="group relative w-full text-left rounded-2xl p-6 cursor-pointer select-none transition-all duration-200 outline-none bg-white border border-black/8 shadow-sm hover:border-black/16 hover:shadow-md"
    >
      {/* Top row: Platform Brand + Live Badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-black/5"
            style={{ background: accentBg }}
          >
            <PlatformIcon platformId={platformId} color={accentColor} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#171717] tracking-wider uppercase leading-none">
              {platformName}
            </h3>
            <span className="text-xs font-mono text-[#57606A] block mt-1">
              @{handle}
            </span>
          </div>
        </div>

        {/* Live Indicator Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F6F2] border border-black/5 text-[11px] font-mono text-[#57606A]">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isLive ? 'bg-[#4E8752]' : 'bg-[#8C959F]'
            }`}
          />
          <span>{isLive ? 'Live' : 'Synced'}</span>
        </div>
      </div>

      {/* Hero Metric: Rating + Rank */}
      <div className="flex items-end justify-between py-2 border-t border-black/5 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
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
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C959F] block mb-1">
            Rank
          </span>
          <span
            className="inline-block px-2.5 py-0.5 rounded text-xs font-mono font-semibold tracking-wide uppercase border border-black/5"
            style={{
              background: accentBg,
              color: accentColor,
            }}
          >
            {rank || 'Unrated'}
          </span>
        </div>
      </div>

      {/* Bottom CTA affordance */}
      <div className="flex items-center justify-between pt-1 text-xs font-mono text-[#57606A] group-hover:text-[#171717] transition-colors">
        <span>View detailed history & graph</span>
        <div className="flex items-center gap-1 transition-transform group-hover:translate-x-0.5">
          <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accentColor }} />
        </div>
      </div>
    </motion.div>
  );
};

export default CompactProfileTile;

// done
