import type { GameSystem, PlayerRating } from '../types';

interface RankTableProps {
  game: GameSystem;
  players: PlayerRating[];
}

export function RankTable({ game, players }: RankTableProps) {
  return (
    <section className="rank-panel" aria-labelledby={`rank-${game}`}>
      <header className="rank-panel-header">
        <h2 id={`rank-${game}`}>{game}</h2>
        <span className="rank-panel-badge">ELO</span>
      </header>
      {players.length === 0 ? (
        <p className="empty-state">Nenhuma partida registrada ainda.</p>
      ) : (
        <div className="table-wrap">
          <table className="rank-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Jogador</th>
                <th scope="col">Rating</th>
                <th scope="col">Jogos</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.name} className={index < 3 ? `podium podium-${index + 1}` : undefined}>
                  <td className="rank-pos">{index + 1}</td>
                  <td>{player.name}</td>
                  <td className="rating-cell">{player.rating}</td>
                  <td>{player.played}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
