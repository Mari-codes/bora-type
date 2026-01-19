import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdultsPage } from './pages/AdultsPage';
import { KidsPage } from './pages/KidsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/adults" element={<AdultsPage />} />
        <Route path="/kids" element={<KidsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
