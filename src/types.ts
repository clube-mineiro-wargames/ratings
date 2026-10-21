export const GAME_SYSTEMS = ['MESBG', 'Kill Team', 'OPR'] as const;

export type GameSystem = (typeof GAME_SYSTEMS)[number];

export interface MatchPlayer {
  name: string;
  /** 1 = vitória, 0 = derrota, 0.5 = empate */
  result: number;
}

export interface Match {
  /** Data e horário no formato `YYYY-MM-DDTHH:mm` */
  date: string;
  game: GameSystem;
  players: MatchPlayer[];
}

export interface MatchEloPlayer extends MatchPlayer {
  before: number;
  after: number;
}

export interface MatchWithElo extends Match {
  elo: MatchEloPlayer[];
}

export interface PlayerRating {
  name: string;
  rating: number;
  played: number;
}
