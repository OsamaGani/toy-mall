import { useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { FiCheck } from 'react-icons/fi';

/**
 * Reusable newsletter signup form.
 * Used on the home page (light/large) and footer (dark/compact).
 *
 * Props:
 *   variant   'light' | 'dark'  — colors for placement on light vs dark bg
 *   source    string             — label sent to backend ('home' / 'footer')
 *   compact   boolean            — smaller paddings + rounded styles for the footer
 */
export default function NewsletterForm({ variant = 'light', source = 'home', compact = false }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null); // null | { promoCode } | { alreadySubscribed: true }

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await API.post('/newsletter/subscribe', { email: email.trim(), source });
      toast.success(data.message);
      setDone(data);
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not subscribe — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Confirmation state — replaces the form once a customer is subscribed.
  if (done) {
    if (variant === 'dark') {
      return (
        <div className="bg-emerald-600/20 border border-emerald-500/40 text-emerald-100 rounded-md p-3 text-sm flex items-start gap-2">
          <FiCheck className="text-emerald-300 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold">{done.alreadySubscribed ? 'Already on our list ✨' : 'You\'re in!'}</p>
            <p className="text-xs mt-0.5 opacity-90">
              {done.alreadySubscribed
                ? 'Check your inbox for past offers.'
                : <>Use code <span className="font-mono font-bold text-emerald-200">{done.promoCode}</span> at checkout for 10% off.</>}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-4 max-w-md flex items-start gap-3">
        <FiCheck className="text-emerald-500 mt-0.5 flex-shrink-0" size={20} />
        <div>
          <p className="font-bold">{done.alreadySubscribed ? 'You\'re already on our list! ✨' : 'Welcome to the family! 🎉'}</p>
          <p className="text-sm mt-1">
            {done.alreadySubscribed
              ? 'Check your inbox for our latest offers.'
              : <>Use code <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{done.promoCode}</span> at checkout for 10% off your first order. We\'ve emailed it to you too.</>}
          </p>
        </div>
      </div>
    );
  }

  // ---- Form state ----
  if (variant === 'dark') {
    return (
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0 px-3 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          placeholder="Email address"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md text-sm transition whitespace-nowrap"
        >
          {submitting ? 'Joining…' : 'Subscribe'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 min-w-0 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="Your email"
      />
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Joining…' : 'Subscribe'}
      </button>
    </form>
  );
}
