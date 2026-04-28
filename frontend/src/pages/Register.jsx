import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiUser, FiBriefcase, FiMail } from 'react-icons/fi';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('retail');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', businessName: '', gstNumber: '' });
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const checkEmail = (email) => {
    if (!email) return setEmailError('');
    if (!EMAIL_REGEX.test(email)) return setEmailError('Please enter a valid email format (e.g. you@example.com)');
    setEmailError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(form.email)) return toast.error('Invalid email format');
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    if (accountType === 'wholesale' && !form.businessName) return toast.error('Business name required for wholesale');

    setSubmitting(true);
    try {
      const data = await register({ ...form, accountType });
      // Show OTP in dev mode toast
      if (data.devOTP) {
        toast(`📧 Dev OTP: ${data.devOTP} (also in backend console)`, { duration: 12000, icon: '🔐' });
      }
      navigate('/verify-email');
    } catch {} finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-lg bg-white border rounded-xl shadow-sm p-8">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-1">
            <span className="text-3xl font-extrabold text-primary-500">Toy</span>
            <span className="text-3xl font-extrabold text-gray-900">Mall</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Create Account</h1>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button type="button" onClick={() => setAccountType('retail')}
            className={`border-2 rounded-lg p-4 text-left transition ${accountType === 'retail' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <FiUser className="mb-1" size={20} />
            <p className="font-semibold text-sm">Retail</p>
            <p className="text-xs text-gray-500">Shop for personal use</p>
          </button>
          <button type="button" onClick={() => setAccountType('wholesale')}
            className={`border-2 rounded-lg p-4 text-left transition ${accountType === 'wholesale' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <FiBriefcase className="mb-1" size={20} />
            <p className="font-semibold text-sm">Wholesale</p>
            <p className="text-xs text-gray-500">Bulk pricing for shops</p>
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="label">Full Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          {accountType === 'wholesale' && (
            <>
              <div>
                <label className="label">Business / Shop Name *</label>
                <input className="input" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} required />
              </div>
              <div>
                <label className="label">GST / Tax Number (optional)</label>
                <input className="input" value={form.gstNumber} onChange={(e) => setForm({ ...form, gstNumber: e.target.value })} />
              </div>
            </>
          )}
          <div>
            <label className="label">Email <span className="text-xs text-gray-500 font-normal">(we'll send a 6-digit code to verify)</span></label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className={`input pl-9 ${emailError ? 'border-red-400 focus:ring-red-400' : ''}`}
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); checkEmail(e.target.value); }}
                onBlur={(e) => checkEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Password</label>
              <input type="password" className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div>
              <label className="label">Confirm</label>
              <input type="password" className="input" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
            </div>
          </div>
          <button type="submit" disabled={submitting || loading} className="btn-primary w-full">
            {submitting ? 'Creating...' : `Create ${accountType === 'wholesale' ? 'Wholesale' : 'Retail'} Account`}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-primary-500 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}
