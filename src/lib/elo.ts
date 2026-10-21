import type { GameSystem, Match, MatchEloPlayer, MatchWithElo, PlayerRating } from '../types';
import { GAME_SYSTEMS } from '../types';

export const INITIAL_RATING = 1500;
export const K_FACTOR = 32;

function expectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + 10 ** ((ratingB - ratingA) / 400));
}

function nextRating(rating: number, expected: number, score: number): number {
  return Math.round(rating + K_FACTOR * (score - expected));
}

function sortMatchesChronologically(matches: Match[]): Match[] {
  return [...matches].sort((a, b) => a.date.localeCompare(b.date));
}

export function annotateMatchesWithElo(matches: Match[]): MatchWithElo[] {
  const maps = Object.fromEntries(
    GAME_SYSTEMS.map((game) => [game, new Map<string, number>()]),
  ) as Record<GameSystem, Map<string, number>>;

  return sortMatchesChronologically(matches).map((match) => {
    if (match.players.length !== 2) {
      return { ...match, elo: [] };
    }

    const ratings = maps[match.game];
    const [p1, p2] = match.players;
    const beforeA = ratings.get(p1.name) ?? INITIAL_RATING;
    const beforeB = ratings.get(p2.name) ?? INITIAL_RATING;
    const afterA = nextRating(beforeA, expectedScore(beforeA, beforeB), p1.result);
    const afterB = nextRating(beforeB, expectedScore(beforeB, beforeA), p2.result);

    ratings.set(p1.name, afterA);
    ratings.set(p2.name, afterB);

    const elo: MatchEloPlayer[] = [
      { ...p1, before: beforeA, after: afterA },
      { ...p2, before: beforeB, after: afterB },
    ];

    return { ...match, elo };
  });
}

export function computeRatingsByGame(matches: Match[]): Record<GameSystem, PlayerRating[]> {
  const annotated = annotateMatchesWithElo(matches);
  const maps = Object.fromEntries(
    GAME_SYSTEMS.map((game) => [game, new Map<string, { rating: number; played: number }>()]),
  ) as Record<GameSystem, Map<string, { rating: number; played: number }>>;

  for (const match of annotated) {
    for (const player of match.elo) {
      const previous = maps[match.game].get(player.name);
      maps[match.game].set(player.name, {
        rating: player.after,
        played: (previous?.played ?? 0) + 1,
      });
    }
  }

  const result = {} as Record<GameSystem, PlayerRating[]>;

  for (const game of GAME_SYSTEMS) {
    result[game] = [...maps[game].entries()]
      .map(([name, { rating, played }]) => ({ name, rating, played }))
      .sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
  }

  return result;
}

export function sortMatchesNewestFirst<T extends Match>(matches: T[]): T[] {
  return [...matches].sort((a, b) => b.date.localeCompare(a.date));
}

export function matchKey(match: Match): string {
  return [match.date, match.game, ...match.players.map((player) => player.name)].join('|');
}
