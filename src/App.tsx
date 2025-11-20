import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import Preloader from './components/Preloader';

function App() {
  const location = useLocation();
  const showFooter = location.pathname === '/';
  const showHeader = location.pathname !== '/gallery';
  const [showPreloader, setShowPreloader] = useState(true);
  const [startExitAnimation, setStartExitAnimation] = useState(false);

  useEffect(() => {
    if (!showPreloader) return;
    const timer = setTimeout(() => setStartExitAnimation(true), 1400);
    return () => clearTimeout(timer);
  }, [showPreloader]);

  const handlePreloaderFinish = () => {
    setShowPreloader(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {showPreloader && (
        <Preloader isTransitioning={startExitAnimation} onFinish={handlePreloaderFinish} />
      )}
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
