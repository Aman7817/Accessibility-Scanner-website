import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axios';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Redirect when AuthContext user becomes available
  useEffect(() => {
    console.log('Login.jsx: AuthContext user ->', user);
    if (user) {
      navigate('/Profile', { replace: true });
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
    if (!password) newErrors.password = 'Password required';
    else if (password.length < 6) newErrors.password = 'Password must be >= 6';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[Login] submit clicked', { email });

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await api.post('/users/login', { email, password });
      console.log('[Login] API response:', response?.data);

      // backend might nest payload in response.data.data
      const res = response?.data ?? {};
      const payload = res.data ?? res;

      // Extract user and token from likely places
      const userObj = payload.user ?? payload;
      const token = payload.token ?? payload.accessToken ?? res.token ?? res.accessToken ?? '';

      if (!userObj || typeof userObj !== 'object') {
        console.error('[Login] Could not find user object in response:', response);
        setErrors({ submit: 'Unexpected server response. Check console.' });
        return;
      }

      // Call login with the correct values
      login(userObj, {
        accessToken: token,
        refreshToken: payload.refreshToken ?? '',
      });

      // useEffect will handle navigation when user updates
    } catch (err) {
      console.error('[Login] error:', err);
      if (err.response?.data?.message) setErrors({ submit: err.response.data.message });
      else if (err.request) setErrors({ submit: 'No response from server (check network/CORS)' });
      else setErrors({ submit: 'Unexpected error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <div className="flex flex-col justify-center w-full max-w-md rounded-xl px-8 py-10 border border-slate-700 bg-slate-900 text-white text-sm shadow-xl shadow-slate-900/30">
        <div className="text-center mb-2">
          <div className="mx-auto w-16 h-16 bg-indigo-700 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-slate-300 mt-1">Sign in to your account</p>
        </div>

        {errors.submit && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-4">
            {errors.submit}
          </div>
        )}

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-slate-300">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full p-3 bg-slate-800 border rounded-md focus:outline-none focus:ring-1 transition ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block mb-1 font-medium text-slate-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full p-3 bg-slate-800 border rounded-md focus:outline-none focus:ring-1 transition pr-10 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-700 rounded bg-slate-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-3 font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-offset-slate-900'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;






