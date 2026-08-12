import { Link } from 'react-router-dom';
import { HomeIcon, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-school-cream px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-24 h-24 text-school-red" />
        </div>
        <h1 className="text-9xl font-bold text-school-red mb-4">404</h1>
        <p className="text-3xl text-school-dark mb-10">Oops! Page not found.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-3 bg-red-600 text-white px-14 py-4 rounded-full text-xl font-semibold hover:bg-red-700 transition-colors shadow-2xl shadow-red-500/20 border border-red-700 focus:outline-none focus:ring-4 focus:ring-red-200"
        >
          <HomeIcon className="w-6 h-6" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
