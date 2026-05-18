import { Link } from 'react-router-dom';

const brands = [
  { name: 'Talle',          color: 'bg-amber-600 text-white' },
  { name: 'Featherlite',    color: 'bg-blue-600 text-white' },
  { name: 'Godrej Interio', color: 'bg-emerald-600 text-white' },
  { name: 'Nilkamal',       color: 'bg-red-600 text-white' },
  { name: 'Wakefit',        color: 'bg-orange-500 text-white' },
  { name: 'Green Soul',     color: 'bg-green-600 text-white' },
  { name: 'Boss Chairs',    color: 'bg-slate-700 text-white' },
  { name: 'Durian',         color: 'bg-yellow-700 text-white' },
  { name: 'HOF',            color: 'bg-purple-600 text-white' },
  { name: 'Cellbell',       color: 'bg-indigo-500 text-white' },
  { name: 'Herman Miller',  color: 'bg-rose-700 text-white' },
  { name: 'Steelcase',      color: 'bg-teal-600 text-white' },
];

export default function BrandMarquee() {
  // Duplicate the array for seamless loop
  const looped = [...brands, ...brands];
  return (
    <section className="overflow-hidden border-y bg-white py-6">
      <p className="text-center text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Trusted Chair Brands</p>
      <div className="relative">
        <div className="flex gap-4 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {looped.map((b, i) => (
            <Link
              key={`${b.name}-${i}`}
              to={`/shop?brand=${encodeURIComponent(b.name)}`}
              className={`${b.color} px-6 py-3 rounded-full font-bold text-sm hover:scale-110 transition-transform shadow-md flex-shrink-0`}
            >
              {b.name}
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
