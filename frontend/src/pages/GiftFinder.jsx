import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import { ProductRowSkeleton } from '../components/ProductCardSkeleton';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { FiGift, FiArrowRight, FiCheck, FiRefreshCw } from 'react-icons/fi';

// Three filters chosen for how Indian gift-shoppers actually decide:
//   1. Age — every aunt / uncle / parent thinks in age first
//   2. Budget — second filter, hard cap on spend
//   3. Recipient — softer signal (gender / "any") that helps narrow toy type
// All three feed into a single /products query that the existing shop
// API already supports, so no backend changes are needed.
// Values must match the ageGroup strings stored on Product documents
// (see ShopByAge.jsx + admin product form). Display labels are
// shorter for compactness on the picker grid.
const ageOptions = [
  { value: '0-2 Years',   label: '0–2 yrs',   emoji: '👶', desc: 'Baby & Toddler' },
  { value: '2-4 Years',   label: '2–4 yrs',   emoji: '🧒', desc: 'Pre-school' },
  { value: '4-6 Years',   label: '4–6 yrs',   emoji: '🎈', desc: 'Kindergarten' },
  { value: '6-8 Years',   label: '6–8 yrs',   emoji: '🎨', desc: 'Early grade' },
  { value: '8 Years+',    label: '8 yrs +',   emoji: '🚀', desc: 'Tweens' },
  { value: '12 Years+',   label: '12 yrs +',  emoji: '🎮', desc: 'Teens' },
];

const budgetOptions = [
  { value: 'u500',     label: 'Under ₹500',     min: 0,    max: 500   },
  { value: '500-1500', label: '₹500 – ₹1,500',  min: 500,  max: 1500  },
  { value: '1500-3k',  label: '₹1,500 – ₹3,000', min: 1500, max: 3000  },
  { value: '3k-5k',    label: '₹3,000 – ₹5,000', min: 3000, max: 5000  },
  { value: '5kplus',   label: 'Over ₹5,000',    min: 5000, max: 999999 },
];

const recipientOptions = [
  { value: 'any',  label: 'Any kid',  emoji: '🎁' },
  { value: 'boy',  label: 'For a boy',  emoji: '👦' },
  { value: 'girl', label: 'For a girl', emoji: '👧' },
];

export default function GiftFinder() {
  const [params, setParams] = useSearchParams();

  // Hydrate from URL so customers can share a Gift Finder link with the
  // filters baked in (e.g. they pick age + budget, copy URL, send to
  // their partner — partner sees the same filtered picks).
  const [age, setAge] = useState(params.get('age') || '');
  const [budget, setBudget] = useState(params.get('budget') || '');
  const [recipient, setRecipient] = useState(params.get('recipient') || 'any');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const budgetRange = useMemo(
    () => budgetOptions.find((b) => b.value === budget),
    [budget]
  );

  const reset = () => {
    setAge('');
    setBudget('');
    setRecipient('any');
    setProducts([]);
    setTouched(false);
    setParams({});
  };

  // Persist filters in URL whenever they change. Skipping the empty
  // case keeps `/gifts` clean for first-time visitors.
  useEffect(() => {
    const next = {};
    if (age) next.age = age;
    if (budget) next.budget = budget;
    if (recipient && recipient !== 'any') next.recipient = recipient;
    setParams(next, { replace: true });
  }, [age, budget, recipient, setParams]);

  // Fetch as soon as both age + budget are picked. Recipient is optional.
  useEffect(() => {
    if (!age || !budget) {
      setProducts([]);
      return;
    }
    setTouched(true);
    setLoading(true);
    const q = new URLSearchParams();
    q.set('limit', '24');
    q.set('ageGroup', age);
    if (budgetRange) {
      q.set('minPrice', String(budgetRange.min));
      q.set('maxPrice', String(budgetRange.max));
    }
    // Recipient filter — soft signal. We pass it as a free-text "for"
    // hint that the existing search backend can match against keywords
    // / category. If the backend doesn't recognise it, results just
    // come back un-narrowed which is fine.
    if (recipient && recipient !== 'any') q.set('for', recipient);

    API.get(`/products?${q.toString()}`)
      .then((r) => setProducts(r.data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [age, budget, recipient, budgetRange]);

  const showResults = age && budget;

  return (
    <div>
      <SEO
        title="Gift Finder — Find the Perfect Toy Gift by Age & Budget | Toy Mall"
        description="Stuck on what to buy? Tell us the kid's age and your budget — we'll match the best toy gifts. Birthday gifts, festival gifts, surprise gifts. Curated picks from LEGO, Hot Wheels, Barbie, Nerf and more. Pan-India delivery."
        path="/gifts"
        keywords="gift finder, toy gift finder india, birthday gift for kids, gift by age, gift by budget, gift for 5 year old, gift for 8 year old, kids gift online india, perfect toy gift"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-500 via-pink-500 to-purple-600 text-white overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 tracking-wide">
            <FiGift /> GIFT FINDER
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
            The Perfect Gift in 2 Steps
          </h1>
          <p className="mt-3 text-white/95 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Tell us the kid's age and your budget — we'll match the toys parents and kids actually love. No more guessing in the toy aisle.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        {/* Step 1: Age */}
        <Reveal>
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Step 1 — Pick the kid's age
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
              {ageOptions.map((a) => {
                const picked = age === a.value;
                return (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setAge(a.value)}
                    className={`relative p-3 sm:p-4 rounded-xl border-2 text-center transition-all hover:-translate-y-0.5 ${
                      picked
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-primary-300'
                    }`}
                  >
                    {picked && (
                      <FiCheck className="absolute top-1.5 right-1.5 text-primary-500" size={14} />
                    )}
                    <div className="text-2xl sm:text-3xl mb-1">{a.emoji}</div>
                    <p className={`font-bold text-xs sm:text-sm ${picked ? 'text-primary-600' : 'text-gray-900'}`}>
                      {a.label}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{a.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Step 2: Budget */}
        <Reveal delay={120}>
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Step 2 — Pick your budget
            </p>
            <div className="flex flex-wrap gap-2">
              {budgetOptions.map((b) => {
                const picked = budget === b.value;
                return (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBudget(b.value)}
                    className={`px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all ${
                      picked
                        ? 'border-primary-500 bg-primary-500 text-white shadow-md scale-105'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                    }`}
                  >
                    {picked && <FiCheck className="inline mr-1" size={14} />}
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Optional: Recipient */}
        <Reveal delay={200}>
          <div className="mb-8">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Optional — Who is it for?
            </p>
            <div className="flex flex-wrap gap-2">
              {recipientOptions.map((r) => {
                const picked = recipient === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRecipient(r.value)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
                      picked
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <span>{r.emoji}</span>
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Reset link — only shows once the customer has touched the form */}
        {touched && (
          <div className="text-right mb-2">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 font-semibold"
            >
              <FiRefreshCw size={11} /> Start over
            </button>
          </div>
        )}

        {/* Results */}
        <div className="border-t pt-8 mt-2">
          {!showResults && (
            <div className="text-center py-12">
              <div className="text-6xl mb-3">🎁</div>
              <p className="text-lg font-bold text-gray-700">Pick an age and budget to see matching gifts</p>
              <p className="text-sm text-gray-500 mt-1">
                Don't worry, you can change your mind anytime.
              </p>
            </div>
          )}

          {showResults && (
            <>
              <div className="flex items-end justify-between mb-5 flex-wrap gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold">
                    {loading ? 'Finding gifts…' : `${products.length} matching gift${products.length === 1 ? '' : 's'}`}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {ageOptions.find((a) => a.value === age)?.label || ''}
                    {budget && <> · {budgetOptions.find((b) => b.value === budget)?.label}</>}
                  </p>
                </div>
                <Link
                  to={`/shop?ageGroup=${age}`}
                  className="text-sm font-semibold text-primary-500 hover:underline inline-flex items-center gap-1"
                >
                  See all in this age <FiArrowRight />
                </Link>
              </div>

              {loading ? (
                <ProductRowSkeleton count={4} />
              ) : products.length === 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">🤔</div>
                  <p className="font-bold text-gray-900">No matches in that exact range</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Try a wider budget or a different age. Or{' '}
                    <Link to="/shop" className="text-primary-500 font-semibold hover:underline">
                      browse all toys
                    </Link>.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((p, i) => (
                    <Reveal key={p._id} delay={i * 50}>
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Helpful tips at the bottom */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">Pro tips for buying toy gifts</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-primary-500 font-bold">·</span>
              <span><strong>Age fit matters more than price.</strong> A ₹500 toy the kid actually plays with beats a ₹3,000 one that ends up in storage.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary-500 font-bold">·</span>
              <span><strong>Stuck between two?</strong> WhatsApp us at +91 77380 28750 — we'll help you decide.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary-500 font-bold">·</span>
              <span><strong>Order before 3 PM</strong> for same-day dispatch. Free delivery over ₹999.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
