import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, role } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (token && role) {
      navigate(role === 'admin' ? '/admin' : '/student', { replace: true });
    }
  }, [token, role, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      if (res && res.data) {
        if (res.data.token) {
          const userData = {
            ...res.data,
            role: res.data.role || 'student'
          };
          dispatch(loginSuccess(userData));
        } else {
          setError('Server response missing authentication token.');
        }
      } else {
        setError('Invalid response from server.');
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-green-100">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl border">
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-blue-300 via-green-200 to-purple-200 w-1/2 relative">
          <div className="flex flex-col items-center z-10">
            <img
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
              alt="Login illustration"
              className="w-52 h-52 object-contain mb-6 drop-shadow-xl"
            />
            <h2 className="text-3xl font-extrabold text-gray-700 mb-2 text-center drop-shadow">
              Welcome Back!
            </h2>
            <p className="text-lg text-gray-600 text-center">
              Login to access your personal dashboard and resources.
            </p>
          </div>
          <div className="absolute inset-0 bg-white opacity-5 z-0"></div>
        </div>
        <form
          onSubmit={submit}
          className="flex-1 p-8 md:p-16 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 drop-shadow">
            Sign In
          </h2>

          {error && (
            <div className="mb-4 p-2 rounded text-red-700 text-center bg-red-50 border border-red-200 animate-shake">{error}</div>
          )}

          <div className="mb-5">
            <label htmlFor="login-email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              id="login-email"
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none transition shadow-sm"
              placeholder="you@example.com"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="mb-7 relative">
            <label htmlFor="login-password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none transition shadow-sm"
              placeholder="Enter your password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(sp => !sp)}
              className="absolute right-4 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-blue-700 transition"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.134-8-7 0-1.406.402-2.712 1.125-3.825M9.88 9.88A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .32-.05.627-.142.916M21 21l-6-6m-2-2l-6-6" />
                </svg>
              )}
            </button>
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-lg font-bold shadow-lg hover:from-blue-600 hover:to-green-500 transform hover:scale-105 transition disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-40" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Logging in...
              </span>
            ) : 'Login'}
          </button>

          <div className="mt-6 text-center text-gray-700 text-base">
            <span>Don't have an account?{' '}</span>
            <Link className="text-blue-600 hover:underline font-semibold" to="/signup">
              Sign up
            </Link>
          </div>
          <div className="mt-3 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-blue-700 transition">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
