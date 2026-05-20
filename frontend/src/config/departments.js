// Single source of truth for the chair / furniture department hierarchy.
// Used by: Navbar mega-menu, Department page, Category page, admin dropdowns, seed.
// `slug` is what shows up in URLs (/dept/:slug and /category/:slug).
// `name` is the canonical category string stored on Product.category.
//
// Catalog mirrors futuristicconcepts.in — pure office-seating focus, no
// sofas / dining / banquet / outdoor / kids. Same nine product categories
// as the reference site (Office, Executive, Ergonomic, Premium, Designer,
// Gaming, Study, Tandem, Cafeteria) plus the IndiaMART specialties
// (Training & Classroom, Boardroom, X-Series) and one accessory dept for
// Table Bases.

export const departments = [
  {
    slug: 'office-chairs',
    name: 'Office Chairs',
    emoji: '💼',
    color: 'from-slate-600 to-slate-800',
    blurb: 'Executive, ergonomic, boardroom and X-series chairs built for daily office use.',
    items: [
      { slug: 'office-chair',           name: 'Office Chair' },
      { slug: 'executive',              name: 'Executive' },
      { slug: 'ergonomic',              name: 'Ergonomic' },
      { slug: 'boardroom-chairs',       name: 'Boardroom Chairs' },
      { slug: 'x-series-chairs',        name: 'X-Series Chairs' },
    ],
  },
  {
    slug: 'premium-designer',
    name: 'Premium & Designer',
    emoji: '✨',
    color: 'from-amber-600 to-orange-700',
    blurb: 'Statement seating — premium-tier chairs and designer pieces for owner cabins and reception areas.',
    items: [
      { slug: 'premium',  name: 'Premium' },
      { slug: 'designer', name: 'Designer' },
    ],
  },
  {
    slug: 'gaming-chairs',
    name: 'Gaming Chairs',
    emoji: '🎮',
    color: 'from-red-500 to-rose-700',
    blurb: 'Racing-style gaming chairs with lumbar support and recline.',
    items: [
      { slug: 'gaming', name: 'Gaming' },
    ],
  },
  {
    slug: 'education-public',
    name: 'Education & Public Seating',
    emoji: '🎓',
    color: 'from-sky-500 to-blue-700',
    blurb: 'Study, training, tandem and cafeteria seating for schools, training halls and lounges.',
    items: [
      { slug: 'study-chair',                  name: 'Study Chair' },
      { slug: 'training-and-classroom-chairs', name: 'Training & Classroom Chairs' },
      { slug: 'tandem',                       name: 'Tandem' },
      { slug: 'cafeteria',                    name: 'Cafeteria' },
    ],
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    emoji: '🧩',
    color: 'from-indigo-500 to-purple-700',
    blurb: 'Replacement parts and add-ons — including custom-sized table bases.',
    items: [
      { slug: 'table-bases', name: 'Table Bases' },
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
