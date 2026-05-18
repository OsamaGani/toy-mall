import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Reveal from '../components/Reveal';
import {
  FiFilter, FiX, FiArrowRight, FiShield, FiTruck, FiAward, FiTool,
  FiZap, FiStar, FiPhone,
} from 'react-icons/fi';
import { PHONE_PRIMARY_DISPLAY, PHONE_PRIMARY_TEL, waLink } from '../config/contact';

// Sub-category chips — `match` is a list of keywords, ANY match passes.
// Filters the catalog down to chair-service-adjacent listings (repair packs,
// spare parts, refurb-friendly base models).
const subCategories = [
  { key: '',           label: 'All Services & Parts',  emoji: '🔧', match: [] },
  { key: 'hydraulic',  label: 'Hydraulic Repair',      emoji: '⛽',  match: ['hydraulic', 'cylinder', 'gas-lift', 'gaslift'] },
  { key: 'reupholster',label: 'Reupholstery',          emoji: '🧵', match: ['reupholster', 'upholstery', 'cushion', 'fabric replace'] },
  { key: 'wheels',     label: 'Wheels & Base',         emoji: '⚙',  match: ['wheel', 'caster', 'base', 'star base'] },
  { key: 'armrest',    label: 'Armrest & Lumbar',      emoji: '💪', match: ['armrest', 'arm rest', 'lumbar', 'headrest'] },
  { key: 'office',     label: 'Office Chair Service',  emoji: '💼', match: ['executive', 'ergonomic', 'workstation', 'office'] },
  { key: 'gaming',     label: 'Gaming Chair Service',  emoji: '🎮', match: ['gaming', 'racing', 'pro gaming'] },
];

const materials = ['Mesh', 'Leather', 'Faux Leather', 'Fabric', 'Plastic', 'Wood', 'Metal'];
const colors    = ['Black', 'Brown', 'Grey', 'White', 'Red', 'Blue', 'Beige'];
const priceBuckets = [
  { label: 'Under ₹1,000',       min: 0,     max: 1000 },
  { label: '₹1,000 – ₹3,000',    min: 1000,  max: 3000 },
  { label: '₹3,000 – ₹10,000',   min: 3000,  max: 10000 },
  { label: 'Above ₹10,000',      min: 10000, max: 9999999 },
];

// Highlight cards rendered above the grid — chair-care promise.
const highlights = [
  { icon: <FiShield />, title: 'BIFMA-Certified Parts', desc: 'Class-4 hydraulics, premium fabrics — same standards as new chairs.' },
  { icon: <FiAward />,  title: '15+ Years Experience',  desc: 'Mumbai\'s trusted chair workshop, run by craftsmen since 2009.' },
  { icon: <FiTool />,   title: 'Doorstep Service',      desc: 'Pickup, repair, return — no need to drag the chair down 5 floors.' },
  { icon: <FiTruck />,  title: '7-Day Turnaround',      desc: 'Most repairs returned within a week. Same-day for minor fixes.' },
];

export default function ActionToys() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const sub        = params.get('sub')      || '';
  const material   = params.get('material') || '';
  const color      = params.get('color')    || '';
  const priceIdx   = params.get('price')    || '';
  const sort       = params.get('sort')     || '';
  const inStock    = params.get('inStock')  === '1';

  // Fetch everything that could plausibly be a repair-relevant listing: the
  // "General" catch-all bucket (where the seed puts service line items) plus
  // anything that mentions repair / spare keywords in name or description.
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const q = new URLSearchParams();
        if (material) q.set('material', material);
        if (sort)     q.set('sort', sort);
        q.set('limit', 60);
        const { data } = await API.get(`/products?${q.toString()}`);
        const all = data.products || [];
        // Keep only listings that look service-adjacent: brand=Talle, or
        // names containing repair / cushion / cylinder / wheel keywords.
        const serviceKeywords = ['repair', 'cushion', 'cylinder', 'wheel', 'reupholster', 'service', 'replacement', 'caster', 'hydraulic'];
        const filtered = all.filter((p) => {
          const hay = `${p.name} ${p.description || ''} ${p.brand || ''}`.toLowerCase();
          return p.brand === 'Talle' || serviceKeywords.some((kw) => hay.includes(kw));
        });
        setProducts(filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [material, sort]);

  const filtered = useMemo(() => {
    let list = products;
    if (sub) {
      const chip = subCategories.find((c) => c.key === sub);
      const keywords = chip?.match ?? [];
      if (keywords.length) {
        list = list.filter((p) => {
          const hay = `${p.name} ${p.description || ''}`.toLowerCase();
          return keywords.some((kw) => hay.includes(kw));
        });
      }
    }
    if (color) {
      list = list.filter((p) =>
        `${p.name} ${p.description || ''}`.toLowerCase().includes(color.toLowerCase()),
      );
    }
    if (priceIdx !== '') {
      const bucket = priceBuckets[+priceIdx];
      if (bucket) {
        list = list.filter((p) => {
          const f = p.discount > 0 ? p.price - (p.price * p.discount) / 100 : p.price;
          return f >= bucket.min && f < bucket.max;
        });
      }
    }
    if (inStock) list = list.filter((p) => p.stock > 0);
    return list;
  }, [products, sub, color, priceIdx, inStock]);

  const updateParam = (key, value) => {
    const np = new URLSearchParams(params);
    if (value === '' || value === null || value === undefined) np.delete(key);
    else np.set(key, value);
    setParams(np);
  };

  const clearAll = () => setParams({});

  const FilterPanel = (
    <div className="space-y-6 text-sm">
      <FilterGroup
        title="Material"
        items={materials}
        active={material}
        onChange={(v) => updateParam('material', v === material ? '' : v)}
      />
      <FilterGroup
        title="Color"
        items={colors}
        active={color}
        onChange={(v) => updateParam('color', v === color ? '' : v)}
      />
      <div>
        <h3 className="font-bold mb-2">Price</h3>
        <ul className="space-y-1">
          {priceBuckets.map((b, i) => (
            <li key={b.label}>
              <label className="flex items-center gap-2 cursor-pointer hover:text-primary-500">
                <input
                  type="radio"
                  checked={priceIdx === String(i)}
                  onChange={() => updateParam('price', String(i))}
                  className="accent-primary-500"
                />
                {b.label}
              </label>
            </li>
          ))}
          {priceIdx !== '' && (
            <li>
              <button
                onClick={() => updateParam('price', '')}
                className="text-xs text-primary-500 hover:underline mt-1"
              >
                Clear
              </button>
            </li>
          )}
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-2">Availability</h3>
        <label className="flex items-center gap-2 cursor-pointer hover:text-primary-500">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => updateParam('inStock', e.target.checked ? '1' : '')}
            className="accent-primary-500"
          />
          In Stock Only
        </label>
      </div>
      <button
        onClick={clearAll}
        className="text-primary-500 hover:underline font-semibold"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="bg-white">
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-700 to-red-800 text-white">
        <img
          src="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1600"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
        />
        <div className="absolute -top-20 -right-10 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-24 -left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20">
          {/* Breadcrumb */}
          <nav className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 flex items-center gap-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white font-semibold">Chair Repair & Service</span>
          </nav>

          <span className="inline-block w-fit bg-yellow-300 text-gray-900 text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-full mb-3 tracking-wide shadow">
            🔧 TALLE SPECIALTY
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg max-w-3xl">
            Expert Chair Repair & Refurbishing
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-xl text-white/95 max-w-2xl">
            Mumbai's go-to workshop for hydraulic replacement, reupholstery, wheel & base fix
            and full chair refurbishing. Bring it in — or we'll come pick it up.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 mt-5 sm:mt-7 text-xs sm:text-sm">
            <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full font-semibold">✓ BIFMA-Grade Parts</span>
            <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full font-semibold">✓ Doorstep Pickup</span>
            <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full font-semibold">✓ 7-Day Turnaround</span>
            <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full font-semibold">✓ 6-Month Warranty</span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={`tel:${PHONE_PRIMARY_TEL}`}
              className="inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-yellow-300 font-bold px-6 py-3 rounded-full shadow-lg transition"
            >
              <FiPhone /> Call {PHONE_PRIMARY_DISPLAY}
            </a>
            <a
              href={waLink('Hi Talle! I need a chair repair quote.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition"
            >
              💬 WhatsApp Quote
            </a>
          </div>
        </div>
      </section>

      {/* Sub-category chips — quick filters */}
      <section className="border-b sticky top-[57px] md:top-0 z-30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 sm:gap-3 min-w-max">
            {subCategories.map((c) => {
              const active = sub === c.key;
              return (
                <button
                  key={c.label}
                  onClick={() => updateParam('sub', c.key)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap border transition ${
                    active
                      ? 'bg-primary-500 text-white border-primary-500 shadow'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-primary-400 hover:text-primary-500'
                  }`}
                >
                  <span>{c.emoji}</span> {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlight strip */}
      <section className="border-b bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {highlights.map((h) => (
            <div key={h.title} className="flex items-start gap-3 bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition">
              <div className="bg-primary-50 text-primary-600 w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                {h.icon}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm">{h.title}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters + grid */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4 sm:mb-6 border-b pb-3 sm:pb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold">
              {(subCategories.find((c) => c.key === sub) || subCategories[0]).label}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {loading ? 'Loading…' : `${filtered.length} item${filtered.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowFilter(true)}
              className="lg:hidden flex items-center gap-1.5 border px-3 py-2 rounded text-sm"
            >
              <FiFilter size={14} /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm bg-white"
            >
              <option value="">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          <aside className="hidden lg:block">{FilterPanel}</aside>

          {showFilter && (
            <div
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              onClick={() => setShowFilter(false)}
            >
              <div
                className="bg-white w-72 h-full p-4 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Filters</h2>
                  <button onClick={() => setShowFilter(false)}><FiX /></button>
                </div>
                {FilterPanel}
              </div>
            </div>
          )}

          <div>
            {loading ? (
              <Loader />
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed rounded-xl">
                <FiZap className="mx-auto text-5xl text-primary-400 mb-3" />
                <p className="text-gray-700 font-semibold text-lg">No service items match these filters</p>
                <p className="text-gray-500 text-sm mt-1">Try clearing some filters, or call us for a custom quote.</p>
                <div className="flex justify-center gap-3 mt-5">
                  <button onClick={clearAll} className="btn-primary">Clear Filters</button>
                  <Link to="/contact" className="border border-gray-300 hover:border-primary-500 hover:text-primary-500 font-semibold px-5 py-2 rounded transition">
                    Get a Custom Quote
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map((p, i) => (
                  <Reveal key={p._id} delay={i * 40}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEO / category description content */}
      <section className="bg-gray-50 border-t">
        <div className="max-w-5xl mx-auto px-4 py-12 prose prose-sm sm:prose-base">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 text-gray-900">
              Chair Repair & Refurbishing in Mumbai
            </h2>
            <p className="text-gray-600">
              A good chair is worth saving. We rebuild executive, ergonomic, gaming and dining
              chairs from the cushion up — replacing worn hydraulics, frayed mesh, broken wheels
              and tired upholstery. Most of our customers spend a fraction of the cost of a new
              chair and get another 5+ years out of one they already love.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-8 not-prose">
              <BulletCard
                icon={<FiTool />}
                title="Hydraulic Cylinder Replacement"
                desc="Class-4 BIFMA-certified gas-lifts. Stop the chair from sinking. Same-day service for most models."
              />
              <BulletCard
                icon={<FiZap />}
                title="Full Reupholstery"
                desc="Choose from premium mesh, fabric or PU leather. Cushion redo, foam replacement included."
              />
              <BulletCard
                icon={<FiAward />}
                title="Wheel & Base Fix"
                desc="Replace cracked star bases, swap noisy wheels for smooth polyurethane casters."
              />
              <BulletCard
                icon={<FiStar />}
                title="Complete Refurbishing"
                desc="Bring in a tired chair, take home one that looks and feels brand new — for half the price."
              />
            </div>

            <h3 className="mt-10 text-xl font-bold text-gray-900">Why customers choose Talle</h3>
            <ul className="text-gray-600 list-disc pl-5 space-y-1">
              <li>15+ years of chair-only craftsmanship — we don't dabble, we specialise.</li>
              <li>Genuine spares: BIFMA-rated hydraulics, branded casters, original-fit cushions.</li>
              <li>Doorstep pickup &amp; drop across Mumbai — no muscle work for you.</li>
              <li>Transparent quote before we start. No surprise charges.</li>
              <li>6-month workmanship warranty on every repair.</li>
            </ul>

            <div className="mt-10 not-prose">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition"
              >
                Browse All Chairs <FiArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function FilterGroup({ title, items, active, onChange }) {
  return (
    <div>
      <h3 className="font-bold mb-2">{title}</h3>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it}>
            <label className="flex items-center gap-2 cursor-pointer hover:text-primary-500">
              <input
                type="radio"
                checked={active === it}
                onChange={() => onChange(it)}
                className="accent-primary-500"
              />
              {it}
            </label>
          </li>
        ))}
        {active && (
          <li>
            <button
              onClick={() => onChange('')}
              className="text-xs text-primary-500 hover:underline mt-1"
            >
              Clear
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

function BulletCard({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="bg-primary-50 text-primary-600 w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-gray-600 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
