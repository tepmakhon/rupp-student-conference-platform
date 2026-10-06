export const BADGES = [
  { id: 1, name: "Active Student", icon: "🥉", color: "bronze", requiredScore: 50 },
  { id: 2, name: "Community Contributor", icon: "🥈", color: "silver", requiredScore: 150 },
  { id: 3, name: "Campus Champion", icon: "🥇", color: "gold", requiredScore: 300 },
  { id: 4, name: "University Leader", icon: "🏆", color: "purple", requiredScore: 600 },
  { id: 5, name: "Legend Student", icon: "💎", color: "blue", requiredScore: 1000 },
];
export const getBadgesForScore = (score: number) =>
  BADGES.map((badge) => ({ ...badge, unlocked: score >= badge.requiredScore }));
