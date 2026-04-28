import { Link } from 'react-router-dom';

const brands = [
  { name: 'LEGO',         color: 'bg-yellow-400 text-gray-900' },
  { name: 'Hot Wheels',   color: 'bg-red-500 text-white' },
  { name: 'Barbie',       color: 'bg-pink-500 text-white' },
  { name: 'Nerf',         color: 'bg-orange-500 text-white' },
  { name: 'Magna-Tiles',  color: 'bg-purple-500 text-white' },
  { name: 'Crayola',      color: 'bg-green-500 text-white' },
  { name: 'Marvel',       color: 'bg-red-700 text-white' },
  { name: 'Transformers', color: 'bg-blue-600 text-white' },
  { name: 'Kinderkraft',  color: 'bg-teal-500 text-white' },
  { name: 'Skillmatics',  color: 'bg-indigo-500 text-white' },
  { name: 'Bburago',      color: 'bg-yellow-600 text-white' },
  { name: 'Funskool',     color: 'bg-rose-500 text-white' },
];

export default function BrandMarquee() {
  // Duplicate the array for seamless loop
  const looped = [...brands, ...brands];
  return (
    <section className="overflow-hidden border-y bg-white py-6">
      <p className="text-center text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Trusted Toy Brands</p>
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
