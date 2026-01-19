import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdultsPage } from './pages/AdultsPage';
import { KidsPage } from './pages/KidsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/adults" replace />} />
        <Route path="/adults" element={<AdultsPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;