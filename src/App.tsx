import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Home } from './pages/Home'; // Importando a nova Home
import { AdultsPage } from './pages/AdultsPage';
import { KidsPage } from './pages/KidsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/type" element={<AdultsPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
