export interface CodeforcesContest {
  contestId: number;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingUpdateTimeSeconds: number;
}

export interface CodeforcesProfileData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contestsCount: number;
  bestRank: number;
  recentDelta: number;
  history: CodeforcesContest[];
  lastUpdated: string;
}

export interface LeetCodeContestHistoryItem {
  contestTitle: string;
  startTime: number;
  rating: number;
  ranking: number;
  attended: boolean;
}

export interface LeetCodeProblemStats {
  all: number;
  easy: number;
  medium: number;
  hard: number;
}

export interface LeetCodeProfileData {
  username: string;
  rating: number;
  globalRanking: number;
  topPercentage: number;
  totalParticipants: number;
  badge: string;
  attendedContestsCount: number;
  reputation: number;
  profileRanking: number;
  problems: LeetCodeProblemStats;
  history: LeetCodeContestHistoryItem[];
  lastUpdated: string;
}

export interface GraphPoint {
  id: string | number;
  title: string;
  date: string;
  rating: number;
  oldRating?: number;
  delta?: number;
  rank?: number;
}
