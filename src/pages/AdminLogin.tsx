import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, UserRound, Eye, EyeOff } from 'lucide-react';
import { signInAdmin, signUpAdmin } from '../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'create'>('login');
  const [fullName, setFullName] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // full email for submission
  const email = emailUser.trim() ? `${emailUser.trim()}@gmail.com` : '';
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCreateOption, setShowCreateOption] = useState(() => localStorage.getItem('admin_created') !== 'true');

  const persistAdminSession = (user: any, session: any) => {
    const adminSession = {
      id: user?.id,
      email: user?.email,
      full_name: user?.user_metadata?.full_name || user?.user_metadata?.name || fullName || null,
      role: 'admin',
      session: {
        access_token: session?.access_token,
        refresh_token: session?.refresh_token,
        expires_at: session?.expires_at,
      },
    };

    localStorage.setItem('admin', JSON.stringify(adminSession));
    localStorage.setItem('admin_created', 'true');
    setShowCreateOption(false);
    navigate('/admin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const normalizedEmail = email.toLowerCase();
      const normalizedPassword = password.trim();

      if (!emailUser.trim() || !normalizedPassword) {
        setError('Email and password are required.');
        return;
      }

      if (mode === 'create') {
        const { user, session } = await signUpAdmin(normalizedEmail, normalizedPassword, fullName.trim() || 'Admin');

        localStorage.setItem('admin_created', 'true');
        setShowCreateOption(false);

        if (session && user) {
          persistAdminSession(user, session);
          return;
        }

        setSuccess('Admin account created successfully. Please check your email and confirm it, then log in with the same credentials.');
        setMode('login');
        setPassword('');
        return;
      }

      const { user, session } = await signInAdmin(normalizedEmail, normalizedPassword);
      persistAdminSession(user, session);
    } catch (err: unknown) {
      console.error('Auth error', err);

      const message = err instanceof Error ? err.message : 'Authentication failed.';

      if (mode === 'create') {
        setError(message.includes('already registered') ? 'This email is already registered. Please log in instead.' : 'Failed to create admin account. Please try again.');
        return;
      }

      setError(message.includes('Invalid login credentials') ? 'Invalid email or password.' : 'Login failed. Please check your Supabase admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-school-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-school-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-school-green" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {mode === 'create' ? 'Create Admin' : 'Admin Login'}
            </h1>
            <p className="text-sm text-gray-500">
              {mode === 'create'
                ? 'Create the first admin account in Supabase'
                : 'Sign in to manage notices and gallery'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
                {success}
              </div>
            )}

            {mode === 'create' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-green/20 focus:border-school-green outline-none transition-all"
                    placeholder="School Admin"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="flex items-stretch border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-school-green/20 focus-within:border-school-green transition-all">
                {/* Mail icon + username input */}
                <div className="relative flex-1 flex items-center">
                  <Mail className="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={emailUser}
                    onChange={(e) => setEmailUser(e.target.value.replace(/@.*/, ''))}
                    className="w-full pl-10 pr-2 py-3 outline-none bg-white text-gray-900 placeholder-gray-400"
                    placeholder="youremail"
                    required
                    autoComplete="username"
                  />
                </div>
                {/* Fixed @gmail.com suffix */}
                <div className="flex items-center px-3 bg-gray-50 border-l border-gray-200 select-none">
                  <span className="text-sm font-medium text-gray-400 whitespace-nowrap">@gmail.com</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-green/20 focus:border-school-green outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-school-green text-white font-semibold rounded-lg hover:bg-school-green/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? (mode === 'create' ? 'Creating Admin...' : 'Signing in...') : mode === 'create' ? 'Create Admin Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            {showCreateOption && (
              <button
                type="button"
                onClick={() => {
                  setMode((prev) => (prev === 'login' ? 'create' : 'login'));
                  setError('');
                  setSuccess('');
                }}
                className="text-sm text-gray-600 hover:text-school-green transition-colors font-medium"
              >
                {mode === 'login' ? 'Create admin account' : 'Already have an admin account? Sign in'}
              </button>
            )}

            <div className={showCreateOption ? 'mt-4' : 'mt-0'}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-school-green transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
