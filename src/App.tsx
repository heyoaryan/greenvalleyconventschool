import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';

function App() {
  const location = useLocation();
  const showFooter = location.pathname === '/';
  const showHeader = location.pathname !== '/gallery';

  return (
    <div className="min-h-screen bg-white">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
