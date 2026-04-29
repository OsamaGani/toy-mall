import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import PasswordInput, { scorePassword } from '../components/PasswordInput';
import {
  FiUser, FiBriefcase, FiMail, FiArrowRight, FiCheck, FiX,
  FiGift, FiTag, FiTruck, FiZap,
} from 'react-icons/fi';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD_SCORE = 3;

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('retail');
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '',
    businessName: '', gstNumber: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const checkEmail = (email) => {
    if (!email) return setEmailError('');
    if (!EMAIL_REGEX.test(email)) return setEmailError('Please enter a valid email format');
    setEmailError('');
  };

  const passwordsMatch = form.confirm === '' || form.confirm === form.password;
  const pwScore = scorePassword(form.password);
  const pwStrongEnough = pwScore >= MIN_PASSWORD_SCORE;

  const submit = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(form.email)) return toast.error('Invalid email format');
    if (!pwStrongEnough) {
      return toast.error('Password is too weak — use 8+ chars with mixed case, numbers and a symbol');
    }
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (accountType === 'wholesale' && !form.businessName) return toast.error('Business name required for wholesale');

    setSubmitting(true);
    try {
      const data = await register({ ...form, accountType });
      if (data.devOTP) {
        toast(`📧 Dev OTP: ${data.devOTP} (also in backend console)`, { duration: 12000, icon: '🔐' });
      }
      navigate('/verify-email');
    } catch {} finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] grid lg:grid-cols-2 bg-white">
      {/* ========== LEFT — Brand showcase ========== */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-primary-500 text-white p-12">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-white/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        {/* Floating toy emojis */}
        <span className="absolute top-20 right-16 text-6xl opacity-30 animate-float" style={{ animationDelay: '0.5s' }}>🎁</span>
        <span className="absolute bottom-32 left-20 text-7xl opacity-25 animate-float" style={{ animationDelay: '2s' }}>🪁</span>
        <span className="absolute top-1/2 right-32 text-5xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>🎨</span>
        <span className="absolute top-1/3 left-12 text-5xl opacity-25 animate-float" style={{ animationDelay: '2.5s' }}>🚀</span>

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-1">
            <span className="text-3xl font-extrabold">Toy</span>
            <span className="text-3xl font-extrabold">Mall</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <span className="inline-block bg-yellow-300 text-gray-900 text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
            🎉 Join free
          </span>
          <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Where childhood dreams come to play.
          </h2>
          <p className="mt-4 text-lg text-white/90 leading-relaxed">
            Create your account and unlock special perks reserved for the Toy Mall family.
          </p>

          <div className="mt-10 space-y-4">
            <Perk icon={<FiGift />} text="10% off your first order" />
            <Perk icon={<FiTag />} text="Early access to new arrivals & sales" />
            <Perk icon={<FiTruck />} text="Free shipping on orders ₹999+" />
            <Perk icon={<FiZap />} text="Faster checkout — saved addresses" />
          </div>
        </div>

        <div className="relative z-10 text-sm text-white/75">
          © {new Date().getFullYear()} Toy Mall · Mumbra, Thane
        </div>
      </div>

      {/* ========== RIGHT — Form ========== */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-20 bg-white">
        {/* Mobile-only brand bar */}
        <div className="lg:hidden text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-1">
            <span className="text-3xl font-extrabold text-primary-500">Toy</span>
            <span className="text-3xl font-extrabold text-gray-900">Mall</span>
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Create account</h1>
            <p className="mt-2 text-gray-600">
              Already a member?{' '}
              <Link to="/login" className="font-semibold text-primary-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Account type toggle */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              type="button"
              onClick={() => setAccountType('retail')}
              className={`border-2 rounded-xl p-3 sm:p-4 text-left transition ${
                accountType === 'retail'
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FiUser className="mb-1 text-primary-500" size={20} />
              <p className="font-semibold text-sm">Retail</p>
              <p className="text-xs text-gray-500">Personal shopping</p>
            </button>
            <button
              type="button"
              onClick={() => setAccountType('wholesale')}
              className={`border-2 rounded-xl p-3 sm:p-4 text-left transition ${
                accountType === 'wholesale'
                  ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FiBriefcase className="mb-1 text-purple-500" size={20} />
              <p className="font-semibold text-sm">Wholesale</p>
              <p className="text-xs text-gray-500">Bulk pricing for shops</p>
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input
                className="input py-3"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>

            {accountType === 'wholesale' && (
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">Business Name *</label>
                  <input
                    className="input py-3"
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    placeholder="e.g. Sunshine Toys"
                    required
                  />
                </div>
                <div>
                  <label className="label">GST <span className="text-xs text-gray-500 font-normal">(optional)</span></label>
                  <input
                    className="input py-3"
                    value={form.gstNumber}
                    onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
                    placeholder="27AABCU9603R1ZM"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="label">
                Email{' '}
                <span className="text-xs text-gray-500 font-normal">
                  (we'll send a 6-digit code to verify)
                </span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className={`input pl-10 py-3 ${emailError ? 'border-red-400 focus:ring-red-400' : ''}`}
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); checkEmail(e.target.value); }}
                  onBlur={(e) => checkEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
            </div>

            <PasswordInput
              label="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="new-password"
              showStrength
              required
            />

            <div>
              <label className="label">Confirm Password</label>
              <PasswordInput
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                autoComplete="new-password"
                invalid={!passwordsMatch && form.confirm.length > 0}
                required
              />
              {form.confirm.length > 0 && (
                <p className={`text-xs mt-1.5 flex items-center gap-1 font-medium ${
                  passwordsMatch ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {passwordsMatch
                    ? <><FiCheck size={12} /> Passwords match</>
                    : <><FiX size={12} /> Passwords don't match yet</>}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || loading || !pwStrongEnough || !passwordsMatch}
              className="w-full bg-gradient-to-r from-primary-500 to-pink-500 hover:from-primary-600 hover:to-pink-600 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {submitting
                ? 'Creating…'
                : (<>Create {accountType === 'wholesale' ? 'Wholesale' : 'Retail'} Account <FiArrowRight className="group-hover:translate-x-1 transition" /></>)}
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-400 text-center">
            By creating an account you agree to our{' '}
            <Link to="/terms-of-service" className="hover:text-primary-500 hover:underline">Terms</Link>
            {' '}&{' '}
            <Link to="/privacy-policy" className="hover:text-primary-500 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Perk({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-white/20 backdrop-blur w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white">
        {icon}
      </div>
      <p className="font-medium text-white/95">{text}</p>
    </div>
  );
}
