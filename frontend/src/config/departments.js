// Single source of truth for the chair / furniture department hierarchy.
// Used by: Navbar mega-menu, Department page, Category page, admin dropdowns, seed.
// `slug` is what shows up in URLs (/dept/:slug and /category/:slug).
// `name` is the canonical category string stored on Product.category.

export const departments = [
  {
    slug: 'office-chairs',
    name: 'Office Chairs',
    emoji: '💼',
    color: 'from-slate-600 to-slate-800',
    blurb: 'Executive, ergonomic, premium and training-room chairs built for long workdays.',
    items: [
      { slug: 'executive-chairs',     name: 'Executive Chairs' },
      { slug: 'ergonomic-chairs',     name: 'Ergonomic Chairs' },
      { slug: 'workstation-chairs',   name: 'Workstation Chairs' },
      { slug: 'visitor-chairs',       name: 'Visitor Chairs' },
      { slug: 'conference-chairs',    name: 'Conference Chairs' },
      { slug: 'mesh-chairs',          name: 'Mesh Chairs' },
      { slug: 'premium-chairs',       name: 'Premium / Ergohuman' },
      { slug: 'cushion-series',       name: 'Cushion Series' },
      { slug: 'training-room-chairs', name: 'Training Room Chairs' },
      { slug: 'tandem-seating',       name: 'Tandem Seating' },
    ],
  },
  {
    slug: 'gaming-chairs',
    name: 'Gaming Chairs',
    emoji: '🎮',
    color: 'from-red-500 to-rose-700',
    blurb: 'Racing-style gaming chairs with lumbar support, recline and footrest.',
    items: [
      { slug: 'pro-gaming',     name: 'Pro Gaming Chairs' },
      { slug: 'racing-style',   name: 'Racing Style Chairs' },
      { slug: 'streaming',      name: 'Streaming Chairs' },
      { slug: 'floor-gaming',   name: 'Floor Gaming Chairs' },
    ],
  },
  {
    slug: 'home-living',
    name: 'Home & Living',
    emoji: '🛋',
    color: 'from-amber-600 to-orange-700',
    blurb: 'Recliners, lounge chairs, accent seating and rocking chairs for the home.',
    items: [
      { slug: 'recliners',     name: 'Recliners' },
      { slug: 'lounge-chairs', name: 'Lounge Chairs' },
      { slug: 'accent-chairs', name: 'Accent Chairs' },
      { slug: 'rocking-chairs', name: 'Rocking Chairs' },
      { slug: 'arm-chairs',    name: 'Arm Chairs' },
    ],
  },
  {
    slug: 'dining-cafe',
    name: 'Dining & Cafe',
    emoji: '🍽',
    color: 'from-yellow-600 to-amber-800',
    blurb: 'Dining chairs, bar stools, cafe and cafeteria seating for kitchens, restaurants & office canteens.',
    items: [
      { slug: 'dining-chairs',     name: 'Dining Chairs' },
      { slug: 'bar-stools',        name: 'Bar Stools' },
      { slug: 'cafe-chairs',       name: 'Cafe Chairs' },
      { slug: 'cafeteria-chairs',  name: 'Cafeteria Chairs' },
      { slug: 'restaurant-chairs', name: 'Restaurant Chairs' },
    ],
  },
  {
    slug: 'outdoor-garden',
    name: 'Outdoor & Garden',
    emoji: '🌳',
    color: 'from-emerald-500 to-green-700',
    blurb: 'Weather-resistant patio, garden, folding and beach chairs.',
    items: [
      { slug: 'patio-chairs',   name: 'Patio Chairs' },
      { slug: 'garden-chairs',  name: 'Garden Chairs' },
      { slug: 'folding-chairs', name: 'Folding Chairs' },
      { slug: 'beach-chairs',   name: 'Beach Chairs' },
    ],
  },
  {
    slug: 'banquet-event',
    name: 'Banquet & Event',
    emoji: '🎉',
    color: 'from-purple-500 to-fuchsia-700',
    blurb: 'Stackable banquet, hotel and wedding chairs for halls and event venues.',
    items: [
      { slug: 'banquet-chairs',  name: 'Banquet Chairs' },
      { slug: 'wedding-chairs',  name: 'Wedding Chairs' },
      { slug: 'hotel-chairs',    name: 'Hotel Chairs' },
      { slug: 'tiffany-chairs',  name: 'Tiffany Chairs' },
    ],
  },
  {
    slug: 'kids-study',
    name: 'Kids & Study',
    emoji: '🎒',
    color: 'from-sky-500 to-blue-700',
    blurb: 'Study chairs, kids chairs and bean bags for young learners.',
    items: [
      { slug: 'study-chairs', name: 'Study Chairs' },
      { slug: 'kids-chairs',  name: 'Kids Chairs' },
      { slug: 'bean-bags',    name: 'Bean Bags' },
    ],
  },
  {
    slug: 'salon-medical',
    name: 'Salon & Medical',
    emoji: '💈',
    color: 'from-pink-500 to-rose-600',
    blurb: 'Specialty chairs for salons, spas, clinics and waiting rooms.',
    items: [
      { slug: 'salon-chairs',     name: 'Salon Chairs' },
      { slug: 'barber-chairs',    name: 'Barber Chairs' },
      { slug: 'medical-stools',   name: 'Medical Stools' },
      { slug: 'wheelchairs',      name: 'Wheelchairs' },
    ],
  },
  {
    slug: 'sofas-couches',
    name: 'Sofas & Couches',
    emoji: '🛋',
    color: 'from-amber-700 to-orange-900',
    blurb: 'Single-seater, multi-seater, L-shaped and curved couches for homes, lobbies and waiting rooms.',
    items: [
      { slug: 'sofa-1-seater',    name: '1-Seater Sofa' },
      { slug: 'sofa-2-seater',    name: '2-Seater Sofa' },
      { slug: 'sofa-3-seater',    name: '3-Seater Sofa' },
      { slug: 'l-shaped-couch',   name: 'L-Shaped Couch' },
      { slug: 'curved-couch',     name: 'Curved Couch' },
      { slug: 'lounge-couch',     name: 'Lounge Couch' },
    ],
  },
  {
    slug: 'tables-desks',
    name: 'Tables & Desks',
    emoji: '🪵',
    color: 'from-stone-600 to-stone-900',
    blurb: 'Wooden dining tables, coffee tables, side tables, consoles, bar trolleys and office desks — all made-to-order.',
    items: [
      { slug: 'dining-tables',     name: 'Wooden Dining Tables' },
      { slug: 'coffee-tables',     name: 'Coffee Tables' },
      { slug: 'center-tables',     name: 'Center Tables' },
      { slug: 'side-tables',       name: 'Side Tables' },
      { slug: 'consoles',          name: 'Consoles' },
      { slug: 'bar-trolleys',      name: 'Bar Trolleys' },
      { slug: 'conference-tables', name: 'Conference Tables' },
      { slug: 'office-desks',      name: 'Office Desks' },
    ],
  },
  {
    slug: 'repair-refurbish',
    name: 'Repair & Refurbish',
    emoji: '🔧',
    color: 'from-teal-500 to-cyan-700',
    blurb: 'Talle\'s specialty — cushion redo, hydraulic, wheels & reupholstery.',
    items: [
      { slug: 'cushion-replacement',  name: 'Cushion Replacement' },
      { slug: 'hydraulic-repair',     name: 'Hydraulic Repair' },
      { slug: 'wheel-base-repair',    name: 'Wheel & Base Repair' },
      { slug: 'reupholstery',         name: 'Reupholstery' },
    ],
  },
  {
    slug: 'chair-accessories',
    name: 'Chair Accessories',
    emoji: '🧩',
    color: 'from-indigo-500 to-purple-700',
    blurb: 'Cushions, wheels, hydraulics, armrests and replacement parts.',
    items: [
      { slug: 'seat-cushions',  name: 'Seat Cushions' },
      { slug: 'lumbar-support', name: 'Lumbar Support' },
      { slug: 'caster-wheels',  name: 'Caster Wheels' },
      { slug: 'hydraulic-cylinder', name: 'Hydraulic Cylinder' },
      { slug: 'armrest-pads',   name: 'Armrest Pads' },
    ],
  },
];

// ---- Lookups (build once) ----
const _bySlug = {};
const _byName = {};
const _allItems = [];
for (const d of departments) {
  _bySlug[d.slug] = d;
  for (const it of d.items) {
    const enriched = { ...it, deptSlug: d.slug, deptName: d.name };
    _bySlug[it.slug] = enriched;
    _byName[it.name.toLowerCase()] = enriched;
    _allItems.push(enriched);
  }
}

export function getDepartment(slug) {
  const d = _bySlug[slug];
  return d && d.items ? d : null;
}

export function getCategory(slug) {
  const c = _bySlug[slug];
  return c && !c.items ? c : null;
}

export function getCategoryByName(name) {
  return _byName[(name || '').toLowerCase()] || null;
}

// Flat list of every sub-category (for admin dropdowns, Shop filter, seeding).
export const allSubCategoryNames = _allItems.map((i) => i.name);
export const allSubCategories = _allItems;

// Material options — replaces the legacy "age group" filter for the
// chair business. Centralized here so navbar, shop filter, admin form
// and seed all share one canonical list.
export const materials = [
  'Mesh', 'Leather', 'Faux Leather', 'Fabric', 'Plastic', 'Wood', 'Metal', 'Cushion',
];
