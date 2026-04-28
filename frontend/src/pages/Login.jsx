import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from);
    } catch {}
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-8">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-1">
            <span className="text-3xl font-extrabold text-primary-500">Toy</span>
            <span className="text-3xl font-extrabold text-gray-900">Mall</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Login to continue shopping</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link to="/register" className="text-primary-500 hover:underline font-medium">Register</Link>
        </p>
        <div className="mt-6 p-3 bg-gray-50 border rounded text-xs text-gray-600">
          <p className="font-semibold mb-1">Demo Accounts:</p>
          <p>Admin: admin@toymall.com / admin123</p>
          <p>Customer: customer@toymall.com / customer123</p>
        </div>
      </div>
    </div>
  );
}
