import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCodeforcesProfile } from '../../services/codeforces';
import { useLeetCodeProfile } from '../../services/leetcode';
import CompactProfileTile from './CompactProfileTile';
import CodeforcesDetailModal from './CodeforcesDetailModal';
import LeetCodeDetailModal from './LeetCodeDetailModal';

export const CodingProfiles: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'codeforces' | 'leetcode' | null>(null);

  const { data: cfData, loading: cfLoading, error: cfError } = useCodeforcesProfile(true);
  const { data: lcData, loading: lcLoading, error: lcError } = useLeetCodeProfile(true);

  // Lock body scroll and pause Lenis when modal is open
  useEffect(() => {
    if (activeModal) {
      window.__lenis?.stop();
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
        window.__lenis?.start();
      };
    }
  }, [activeModal]);

  return (
    <div className="w-full">
      {/* Side-by-side Compact Profile Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        <CompactProfileTile
          platformId="codeforces"
          platformName="Codeforces"
          handle="manavp8"
          rating={cfData?.rating || (cfLoading ? 0 : 1629)}
          rank={cfData?.rank || (cfLoading ? 'Loading…' : 'Expert')}
          isLive={!cfError && !!cfData}
          accentColor="#4B88E4"
          accentBg="rgba(75, 136, 228, 0.12)"
          onClick={() => setActiveModal('codeforces')}
        />

        <CompactProfileTile
          platformId="leetcode"
          platformName="LeetCode"
          handle="__Manav_Patel"
          rating={lcData?.rating || (lcLoading ? 0 : 1924)}
          rank={lcData?.badge || (lcLoading ? 'Loading…' : 'Knight')}
          isLive={!lcError && !!lcData}
          accentColor="#E58A2B"
          accentBg="rgba(229, 138, 43, 0.12)"
          onClick={() => setActiveModal('leetcode')}
        />
      </div>

      {/* Expanded Profile Modals */}
      <AnimatePresence>
        {activeModal === 'codeforces' && (
          <CodeforcesDetailModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === 'leetcode' && (
          <LeetCodeDetailModal onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodingProfiles;
