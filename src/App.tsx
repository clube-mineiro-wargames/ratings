import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { History } from './pages/History';
import { Home } from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="historico" element={<History />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
