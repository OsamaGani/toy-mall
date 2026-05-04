import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Reveal from './Reveal';

// Indian customers don't browse "by category" — they shop by occasion.
// "I need a Diwali gift for my niece" or "birthday present for a 5
// year old" is the actual mental model. This strip surfaces the
// occasions that matter in India and routes each to a pre-filtered
// shop view so the customer lands on relevant products immediately.
const occasions = [
  {
    title: 'Birthday Gifts',
    subtitle: 'Wow them on the big day',
    emoji: '🎂',
    bg: 'from-pink-500 via-rose-500 to-red-500',
    link: '/gifts?occasion=birthday',
  },
  {
    title: 'Diwali Specials',
    subtitle: 'Festive picks for kids',
    emoji: '🪔',
    bg: 'from-amber-500 via-orange-500 to-red-600',
    link: '/shop?featured=true',
  },
  {
    title: 'Eid Gifts',
    subtitle: 'Make their Eid memorable',
    emoji: '🌙',
    bg: 'from-emerald-500 via-teal-600 to-cyan-700',
    link: '/shop?bestSeller=true',
  },
  {
    title: 'Christmas Toys',
    subtitle: 'Under-the-tree favourites',
    emoji: '🎄',
    bg: 'from-red-500 via-rose-600 to-pink-700',
    link: '/shop?newArrival=true',
  },
  {
    title: 'STEM & Learning',
    subtitle: 'Toys that teach as they play',
    emoji: '🧠',
    bg: 'from-indigo-500 via-purple-600 to-fuchsia-600',
    link: '/shop?category=Educational',
  },
  {
    title: 'Baby\'s First Toys',
    subtitle: 'Soft, safe, ages 0–2',
    emoji: '👶',
    bg: 'from-sky-400 via-blue-500 to-indigo-600',
    link: '/shop?ageGroup=0-2%20Years',
  },
];

export default function ShopByOccasion() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-12">
      <Reveal>
        <div className="flex items-end justify-between mb-5 sm:mb-6">
          <div>
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-2 tracking-wide">
              🎁 SHOP BY OCCASION
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold">Find the Perfect Gift</h2>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              Picked for every birthday, festival and milestone
            </p>
          </div>
          <Link
            to="/gifts"
            className="hidden sm:inline-flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all"
          >
            Gift Finder <FiArrowRight />
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {occasions.map((o, i) => (
          <Reveal key={o.title} delay={i * 60}>
            <Link
              to={o.link}
              className={`group relative block rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br ${o.bg} text-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 aspect-square sm:aspect-[4/3]`}
            >
              {/* Decorative blob */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition duration-500"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-4">
                <div className="text-3xl sm:text-4xl drop-shadow-md group-hover:scale-110 transition">
                  {o.emoji}
                </div>
                <div>
                  <p className="font-extrabold text-sm sm:text-base leading-tight drop-shadow">
                    {o.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/85 leading-tight mt-0.5 line-clamp-1">
                    {o.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Mobile-only Gift Finder button */}
      <div className="text-center mt-6 sm:hidden">
        <Link
          to="/gifts"
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-full text-sm transition shadow-md"
        >
          Try Gift Finder <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}
