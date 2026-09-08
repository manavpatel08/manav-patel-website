import { useState, useEffect, useCallback } from 'react';
import type { LeetCodeProfileData, LeetCodeContestHistoryItem } from '../types/coding';

const LEETCODE_HANDLE = '__Manav_Patel';
const CACHE_KEY = `lc_profile_v2_${LEETCODE_HANDLE}`;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

let memoryCache: { data: LeetCodeProfileData; timestamp: number } | null = null;

const GRAPHQL_QUERY = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    profile {
      ranking
      reputation
    }
  }
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
    badge {
      name
    }
  }
  userContestRankingHistory(username: $username) {
    attended
    rating
    ranking
    contest {
      title
      startTime
    }
  }
}
`;

export async function fetchLeetCodeData(
  forceRefresh: boolean = false,
  username: string = LEETCODE_HANDLE
): Promise<LeetCodeProfileData> {
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
      // Ignore sessionStorage errors
    }
  }

  // 3. Try endpoints: local Vite proxy (/api/leetcode) then direct/fallback
  const endpoints = [
    '/api/leetcode',
    'https://corsproxy.io/?https%3A%2F%2Fleetcode.com%2Fgraphql',
  ];

  let rawData: any = null;
  let lastError: any = null;

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GRAPHQL_QUERY,
          variables: { username },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.matchedUser) {
          rawData = json.data;
          break;
        }
      }
    } catch (err) {
      lastError = err;
    }
  }

  if (!rawData) {
    if (memoryCache?.data) {
      return memoryCache.data;
    }
    throw new Error(lastError?.message || 'Unable to fetch live LeetCode profile data right now.');
  }

  const { matchedUser, userContestRanking, userContestRankingHistory } = rawData;

  // Extract problems solved
  const acList = matchedUser.submitStats?.acSubmissionNum || [];
  const getCount = (diff: string) => acList.find((item: any) => item.difficulty === diff)?.count || 0;

  const problems = {
    all: getCount('All'),
    easy: getCount('Easy'),
    medium: getCount('Medium'),
    hard: getCount('Hard'),
  };

  // Filter contest history to only attended contests with valid ratings
  const history: LeetCodeContestHistoryItem[] = (userContestRankingHistory || [])
    .filter((c: any) => c.attended && c.rating && c.contest?.title)
    .map((c: any) => ({
      contestTitle: c.contest.title,
      startTime: c.contest.startTime,
      rating: Math.round(c.rating),
      ranking: c.ranking || 0,
      attended: true,
    }));

  const rating = userContestRanking?.rating ? Math.round(userContestRanking.rating) : 0;
  const globalRanking = userContestRanking?.globalRanking || 0;
  const topPercentage = userContestRanking?.topPercentage || 0;
  const totalParticipants = userContestRanking?.totalParticipants || 0;
  const badge = userContestRanking?.badge?.name || 'Knight';
  const attendedContestsCount = userContestRanking?.attendedContestsCount || history.length;
  const reputation = matchedUser.profile?.reputation || 0;
  const profileRanking = matchedUser.profile?.ranking || 0;

  const data: LeetCodeProfileData = {
    username: matchedUser.username || username,
    rating,
    globalRanking,
    topPercentage,
    totalParticipants,
    badge,
    attendedContestsCount,
    reputation,
    profileRanking,
    problems,
    history,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  memoryCache = { data, timestamp: now };
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: now }));
    } catch {
      // Ignore cache storage error
    }
  }

  return data;
}

export function useLeetCodeProfile(autoFetch: boolean = true) {
  const [data, setData] = useState<LeetCodeProfileData | null>(memoryCache?.data || null);
  const [loading, setLoading] = useState<boolean>(!memoryCache?.data && autoFetch);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (force: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchLeetCodeData(force);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Unable to fetch live LeetCode profile data right now.');
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
