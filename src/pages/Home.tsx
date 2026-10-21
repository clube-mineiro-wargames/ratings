import { useMemo } from 'react';
import matchesData from '../data/matches.json';
import { RankTable } from '../components/RankTable';
import { computeRatingsByGame } from '../lib/elo';
import type { Match } from '../types';
import { GAME_SYSTEMS } from '../types';

const matches = matchesData as Match[];

export function Home() {
  const ratingsByGame = useMemo(() => computeRatingsByGame(matches), []);

  return (
    <div className="page page-home">
      <div className="page-intro">
        <h2>Quadro de líderes</h2>
        <p>
          Ratings ELO calculados a partir do histórico de partidas, por ordem cronológica. Rating inicial:{' '}
          <strong>1500</strong>.
        </p>
      </div>
      <div className="rank-grid">
        {GAME_SYSTEMS.map((game) => (
          <RankTable key={game} game={game} players={ratingsByGame[game]} />
        ))}
      </div>
    </div>
  );
}
