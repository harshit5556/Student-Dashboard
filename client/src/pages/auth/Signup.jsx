import { useState } from 'react';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/register', {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password
      });
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Signup failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-purple-200">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl border">
        <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-300 via-green-200 to-purple-200 w-1/2 relative">
          <div className="flex flex-col items-center z-10">
            <img
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg"
              alt="Signup illustration"
              className="w-52 h-52 object-contain mb-6 drop-shadow-xl"
            />
            <h2 className="text-3xl font-extrabold text-gray-700 mb-2 text-center">
              Welcome! <br /> Create Your Account
            </h2>
            <p className="text-lg text-gray-600 text-center mt-2">
              Get started and enjoy all our awesome features.
            </p>
          </div>
          <div className="absolute inset-0 bg-white opacity-5 z-0"></div>
        </div>
        <form
          onSubmit={submit}
          className="flex-1 p-8 md:p-16 flex flex-col justify-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-left text-green-700 drop-shadow">
            Sign Up
          </h2>
          {error && (
            <div className="mb-3 p-2 rounded text-red-700 text-center bg-red-50 border border-red-200 animate-shake">{error}</div>
          )}
          {success && (
            <div className="mb-3 p-2 rounded text-green-800 text-center bg-green-50 border border-green-200">{success}</div>
          )}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none transition shadow-sm"
              placeholder="Full Name"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none transition shadow-sm"
              placeholder="Email Address"
              name="email"
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none transition shadow-sm pr-10"
              placeholder="Password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(sp => !sp)}
              className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-green-700 transition"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor"
                  className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7z"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor"
                  className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.134-8-7 
                    0-1.406.402-2.712 1.125-3.825M9.88 9.88A3 3 0 0112 9c1.657 0 3 1.343 3 3 
                    0 .32-.05.627-.142.916M21 21l-6-6m-2-2l-6-6"/>
                </svg>
              )}
            </button>
          </div>
          <button
            className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 shadow-lg text-white py-2 text-lg rounded-lg font-bold hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-70" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"/>
                </svg>
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="mt-5 text-center">
            <span className="text-gray-700">Already have an account? </span>
            <Link to="/login" className="text-blue-700 font-semibold hover:underline hover:text-blue-900 transition">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
