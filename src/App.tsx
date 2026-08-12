import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import NoticeBoard from './components/NoticeBoard';
import Preloader from './components/Preloader';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';


function App() {
  const location = useLocation();
  const showFooter = location.pathname === '/';
  const showHeader = location.pathname !== '/gallery' && location.pathname !== '/404' && !location.pathname.startsWith('/admin');
  const showNoticeBoard = location.pathname === '/';
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

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      return <Navigate to="/admin/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <div className="min-h-screen bg-school-cream">
      {showPreloader && (
        <Preloader isTransitioning={startExitAnimation} onFinish={handlePreloaderFinish} />
      )}
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      {showFooter && <Footer />}
      {showNoticeBoard && <NoticeBoard />}
    </div>
  );
}

export default App;
