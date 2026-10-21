import { INITIAL_RATING } from '../lib/elo';
import type { MatchEloPlayer, MatchWithElo } from '../types';

interface MatchCardProps {
  match: MatchWithElo;
}

function formatDateTime(value: string): string {
  const [datePart, timePart = '00:00'] = value.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(year, month - 1, day, hour, minute));
}

function resultLabel(result: number): string {
  if (result === 1) return 'V';
  if (result === 0) return 'D';
  return 'E';
}

function formatDelta(delta: number): string {
  if (delta > 0) return `+${delta}`;
  return String(delta);
}

function PlayerRow({ player }: { player: MatchEloPlayer }) {
  const delta = player.after - player.before;
  const label = resultLabel(player.result);
  const outcome =
    label === 'V' ? 'Vitória' : label === 'D' ? 'Derrota' : 'Empate';

  return (
    <li className={`match-player result-${label.toLowerCase()}`}>
      <span className="player-result" aria-label={outcome}>
        {label}
      </span>
      <span className="player-name">{player.name}</span>
      <span className="player-elo">
        <span className="elo-before">{player.before}</span>
        <span className="elo-arrow" aria-hidden="true">
          →
        </span>
        <span className="elo-after">{player.after}</span>
        <span className={`elo-delta ${delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'}`}>
          {formatDelta(delta)}
        </span>
      </span>
    </li>
  );
}

export function MatchCard({ match }: MatchCardProps) {
  const rows = match.elo.length > 0 ? match.elo : match.players.map((player) => ({
    ...player,
    before: INITIAL_RATING,
    after: INITIAL_RATING,
  }));

  return (
    <article className="match-card">
      <div className="match-card-top">
        <time dateTime={match.date}>{formatDateTime(match.date)}</time>
        <span className={`game-pill game-pill--${match.game.replace(/\s+/g, '-').toLowerCase()}`}>
          {match.game}
        </span>
      </div>
      <ul className="match-players">
        {rows.map((player) => (
          <PlayerRow key={player.name} player={player} />
        ))}
      </ul>
    </article>
  );
}
