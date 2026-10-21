import { useMemo } from 'react';
import matchesData from '../data/matches.json';
import { MatchCard } from '../components/MatchCard';
import { annotateMatchesWithElo, matchKey, sortMatchesNewestFirst } from '../lib/elo';
import type { Match } from '../types';

const matches = matchesData as Match[];

export function History() {
  const sorted = useMemo(
    () => sortMatchesNewestFirst(annotateMatchesWithElo(matches)),
    [],
  );

  return (
    <div className="page page-history">
      <div className="page-intro">
        <h2>Histórico de partidas</h2>
        <p>
          Registro das batalhas oficiais do clube, em torneios ou jogos sérios.
        </p>
      </div>
      {sorted.length === 0 ? (
        <p className="empty-state">Nenhuma partida cadastrada.</p>
      ) : (
        <div className="match-list">
          {sorted.map((match, index) => (
            <MatchCard key={`${matchKey(match)}-${index}`} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
