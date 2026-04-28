import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';

export default function VerifyEmailBanner() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  if (!user) return null;
  if (user.emailVerified) return null;
  if (pathname === '/verify-email') return null;

  return (
    <div className="bg-yellow-100 border-b border-yellow-300 text-yellow-900 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2">
          <FiAlertCircle className="text-yellow-600" />
          <span>Your email <strong>{user.email}</strong> is not verified.</span>
        </p>
        <Link to="/verify-email" className="bg-yellow-900 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded inline-flex items-center gap-1">
          Verify Now <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}
