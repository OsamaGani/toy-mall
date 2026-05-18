import { Link } from 'react-router-dom';

// "Trusted by" marquee — scrolls our B2B client list across the page.
// Talle does its own manufacturing, so this strip showcases CUSTOMERS,
// not chair brands we resell. Add more real clients here as the list grows.
const clients = [
  { name: 'WeWork',           color: 'bg-slate-900 text-white' },
  { name: 'Roller Bearing',   color: 'bg-amber-700 text-white' },
  { name: 'Upstep Academy',   color: 'bg-blue-700 text-white' },
  { name: 'Respo Financial',  color: 'bg-emerald-700 text-white' },
  { name: '50+ Coworking Spaces',  color: 'bg-purple-600 text-white' },
  { name: '100+ Coaching Hubs',    color: 'bg-rose-600 text-white' },
  { name: '200+ Mumbai Offices',   color: 'bg-cyan-700 text-white' },
  { name: 'Restaurants & Cafes',   color: 'bg-orange-600 text-white' },
  { name: 'Banquet Halls',         color: 'bg-fuchsia-700 text-white' },
  { name: '& Many More',           color: 'bg-gray-900 text-white' },
];

export default function BrandMarquee() {
  // Duplicate the array for seamless loop
  const looped = [...clients, ...clients];
  return (
    <section className="overflow-hidden border-y bg-white py-6">
      <p className="text-center text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Trusted by Mumbai's Best</p>
      <div className="relative">
        <div className="flex gap-4 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {looped.map((c, i) => (
            <Link
              key={`${c.name}-${i}`}
              to="/about"
              className={`${c.color} px-6 py-3 rounded-full font-bold text-sm hover:scale-110 transition-transform shadow-md flex-shrink-0`}
            >
              {c.name}
            </Link>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white"></div>
      </div>
    </section>
  );
}
