import { useState, useEffect, useCallback } from 'react';
import type { CodeforcesProfileData, CodeforcesContest } from '../types/coding';

const CF_HANDLE = 'manavp8';
const CACHE_KEY = `cf_profile_v2_${CF_HANDLE}`;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// In-memory cache for fast tab switching
let memoryCache: { data: CodeforcesProfileData; timestamp: number } | null = null;

function formatRank(rankStr: string): string {
  if (!rankStr) return 'Unrated';
  return rankStr
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export async function fetchCodeforcesData(
  forceRefresh: boolean = false,
  handle: string = CF_HANDLE
): Promise<CodeforcesProfileData> {
  const now = Date.now();

  // 1. Check memory cache
  if (!forceRefresh && memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return memoryCache.data;
  }

  // 2. Check sessionStorage
  if (!forceRefresh && typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const cachedStr = window.sessionStorage.getItem(CACHE_KEY);
      if (cachedStr) {
        const parsed = JSON.parse(cachedStr);
        if (now - parsed.timestamp < CACHE_TTL_MS) {
          memoryCache = parsed;
          return parsed.data;
        }
      }
    } catch {
      // Ignore cache parse error
    }
  }

  // 3. Fetch from Codeforces API
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const [infoRes, ratingRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`, {
        signal: controller.signal,
      }),
      fetch(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle)}`, {
        signal: controller.signal,
      }),
    ]);

    clearTimeout(timeoutId);

    if (!infoRes.ok) {
      throw new Error(`Codeforces API returned status ${infoRes.status}`);
    }

    const infoJson = await infoRes.json();
    if (infoJson.status !== 'OK' || !infoJson.result || infoJson.result.length === 0) {
      throw new Error('Codeforces API returned no user result');
    }

    const userInfo = infoJson.result[0];

    let history: CodeforcesContest[] = [];
    if (ratingRes.ok) {
      const ratingJson = await ratingRes.json();
      if (ratingJson.status === 'OK' && Array.isArray(ratingJson.result)) {
        history = ratingJson.result.map((c: any) => ({
          contestId: c.contestId,
          contestName: c.contestName,
          rank: c.rank,
          oldRating: c.oldRating,
          newRating: c.newRating,
          ratingUpdateTimeSeconds: c.ratingUpdateTimeSeconds,
        }));
      }
    }

    // Compute stats
    const contestsCount = history.length;
    const bestRank = history.length > 0 ? Math.min(...history.map((c) => c.rank)) : 0;
    const lastContest = history.length > 0 ? history[history.length - 1] : null;
    const recentDelta = lastContest ? lastContest.newRating - lastContest.oldRating : 0;

    const data: CodeforcesProfileData = {
      handle: userInfo.handle,
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || userInfo.rating || 0,
      rank: formatRank(userInfo.rank),
      maxRank: formatRank(userInfo.maxRank),
      contestsCount,
      bestRank,
      recentDelta,
      history,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Save to cache
    memoryCache = { data, timestamp: now };
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: now }));
      } catch {
        // Ignore storage quote errors
      }
    }

    return data;
  } catch (err: any) {
    clearTimeout(timeoutId);
    // If we have any existing cache (even expired), return it with a note, otherwise throw
    if (memoryCache?.data) {
      return memoryCache.data;
    }
    throw new Error(err.message || 'Unable to fetch Codeforces data');
  }
}

export function useCodeforcesProfile(autoFetch: boolean = true) {
  const [data, setData] = useState<CodeforcesProfileData | null>(memoryCache?.data || null);
  const [loading, setLoading] = useState<boolean>(!memoryCache?.data && autoFetch);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (force: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchCodeforcesData(force);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Unable to fetch live profile data right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      load(false);
    }
  }, [autoFetch, load]);

  return {
    data,
    loading,
    error,
    refresh: () => load(true),
  };
}
