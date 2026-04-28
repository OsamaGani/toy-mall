import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiHelpCircle,
  FiArrowLeft,
  FiSearch,
  FiPhone,
} from 'react-icons/fi';

const popularDestinations = [
  { to: '/',         icon: <FiHome />,        label: 'Home',     desc: 'Back to the toy land',   color: 'from-pink-500 to-rose-500' },
  { to: '/shop',     icon: <FiShoppingBag />, label: 'Shop',     desc: 'Browse all toys',        color: 'from-blue-500 to-indigo-500' },
  { to: '/wishlist', icon: <FiHeart />,       label: 'Wishlist', desc: 'Your saved favourites',  color: 'from-purple-500 to-fuchsia-500' },
  { to: '/help',     icon: <FiHelpCircle />,  label: 'Help',     desc: 'FAQs & support',         color: 'from-emerald-500 to-green-500' },
];

const popularCategories = [
  { name: 'Construction', emoji: '🧱' },
  { name: 'Vehicles',     emoji: '🏎' },
  { name: 'Dolls',        emoji: '🪆' },
  { name: 'Action Figures', emoji: '🦸' },
  { name: 'Wooden Toys',  emoji: '🪵' },
  { name: 'Outdoor Toys', emoji: '🪁' },
  { name: 'Games',        emoji: '🎲' },
  { name: 'Books',        emoji: '📚' },
];

export default function NotFound() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.title = '404 — Page Not Found · Toy Mall';
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/shop?search=${encodeURIComponent(q)}`);
  };

  return (
    <div className="relative overflow-hidden">
      {/* soft decorative background */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-50 via-white to-blue-50" />
      <div aria-hidden className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-pink-200/40 blur-3xl -z-10" />
      <div aria-hidden className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl -z-10" />

      <section className="max-w-5xl mx-auto px-4 pt-12 pb-10 text-center">
        {/* Floating toy emojis */}
        <div className="flex justify-center gap-3 mb-6 text-3xl select-none">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>🧸</span>
          <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>🪀</span>
          <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🚂</span>
          <span className="animate-bounce" style={{ animationDelay: '0.45s' }}>🎈</span>
          <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🪁</span>
        </div>

        <h1 className="text-[110px] md:text-[180px] leading-none font-black tracking-tighter bg-gradient-to-r from-primary-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2">
          Oops! This toy rolled away.
        </p>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          The page you're looking for doesn't exist or may have been moved.
          {pathname && (
            <span className="block mt-1 text-xs font-mono text-gray-500 break-all">
              {pathname}
            </span>
          )}
        </p>

        {/* Search bar */}
        <form
          onSubmit={onSearch}
          className="max-w-xl mx-auto mt-8 bg-white rounded-2xl shadow-lg border-2 border-pink-100 p-2 flex items-center"
        >
          <FiSearch className="text-gray-400 ml-3 flex-shrink-0" size={20} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for toys, brands, categories..."
            className="flex-1 px-3 py-3 outline-none text-sm md:text-base bg-transparent"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-3 rounded-xl text-sm transition"
          >
            Search
          </button>
        </form>

        {/* Primary action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            <FiArrowLeft /> Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            <FiHome /> Back to Home
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            <FiShoppingBag /> Continue Shopping
          </Link>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Popular destinations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {popularDestinations.map((d) => (
            <Link
              key={d.to}
              to={d.to}
              className={`bg-gradient-to-br ${d.color} text-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition`}
            >
              <div className="bg-white/20 backdrop-blur w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3">
                {d.icon}
              </div>
              <p className="font-bold">{d.label}</p>
              <p className="text-xs opacity-90 mt-0.5">{d.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by category */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Or pick a category
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {popularCategories.map((c) => (
            <Link
              key={c.name}
              to={`/shop?category=${encodeURIComponent(c.name)}`}
              className="inline-flex items-center gap-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 text-gray-800 font-medium text-sm px-4 py-2 rounded-full transition"
            >
              <span>{c.emoji}</span> {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Help strip */}
      <section className="bg-gradient-to-r from-primary-500 to-pink-500 text-white">
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <p className="text-lg md:text-xl font-bold">Still can't find what you need?</p>
          <p className="opacity-95 text-sm mt-1">
            Our support team is happy to help you find the perfect toy.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-yellow-300 hover:text-gray-900 font-bold px-5 py-2.5 rounded-lg shadow transition"
            >
              <FiPhone /> Contact Support
            </Link>
            <Link
              to="/help"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 font-semibold px-5 py-2.5 rounded-lg transition"
            >
              <FiHelpCircle /> Visit Help Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
