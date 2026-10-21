import { NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/logo.jpg';

export function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <img className="brand-logo" src={logo} alt="Clube Mineiro de Wargames" />
            <div>
              <p className="brand-kicker">Clube Mineiro de Wargames</p>
              <h1 className="brand-title">Rating Ranking</h1>
            </div>
          </div>
          <nav className="main-nav" aria-label="Principal">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Rankings
            </NavLink>
            <NavLink to="/historico" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Histórico
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Preparação. Estratégia. Vitória.</p>
      </footer>
    </div>
  );
}
