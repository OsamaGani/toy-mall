const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const WholesaleCategory = require('../models/WholesaleCategory');
const Order = require('../models/Order');

const categories = [
  { name: 'General', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600' },
  { name: 'Executive Chairs', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600' },
  { name: 'Ergonomic Chairs', image: 'https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f?w=600' },
  { name: 'Workstation Chairs', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600' },
  { name: 'Visitor Chairs', image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=600' },
  { name: 'Mesh Chairs', image: 'https://images.unsplash.com/photo-1505797149-35ebcfa1c2bd?w=600' },
  { name: 'Pro Gaming Chairs', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600' },
  { name: 'Recliners', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600' },
  { name: 'Lounge Chairs', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600' },
  { name: 'Accent Chairs', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600' },
  { name: 'Dining Chairs', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600' },
  { name: 'Bar Stools', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600' },
  { name: 'Cafe Chairs', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600' },
  { name: 'Folding Chairs', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600' },
  { name: 'Garden Chairs', image: 'https://images.unsplash.com/photo-1595514535215-9a5e0e8e7d9c?w=600' },
  { name: 'Banquet Chairs', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600' },
  { name: 'Salon Chairs', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600' },
  { name: 'Bean Bags', image: 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=600' },
];

const brands = [
  'Other', 'Talle', 'Featherlite', 'Godrej Interio', 'Nilkamal', 'Wakefit',
  'Green Soul', 'Boss Chairs', 'Durian', 'HOF', 'Stellar', 'Herman Miller',
  'Steelcase', 'Cellbell', 'AmazonBasics', 'Innowin', 'Kepler Brooks',
  'Misuraa', 'Sleepyhead', 'Spacewood',
].map((name) => ({ name, logo: '' }));

const products = [
  {
    name: 'Talle Aero Executive High-Back Office Chair',
    description: 'Premium executive chair with high-back lumbar support, breathable mesh, adjustable armrests and reclining tilt mechanism. Built for 8+ hour workdays.',
    brand: 'Talle', category: 'Executive Chairs', material: 'Mesh',
    price: 12999, discount: 25, wholesalePrice: 8499, wholesaleMinQty: 5, stock: 40,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
    images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800'],
    featured: true, bestSeller: true, rating: 4.8, numReviews: 142,
  },
  {
    name: 'Featherlite Optima Ergonomic Workstation Chair',
    description: 'Mid-back ergonomic chair with synchro-tilt, adjustable lumbar, 3D armrests and class-4 hydraulic. BIFMA certified for office use.',
    brand: 'Featherlite', category: 'Ergonomic Chairs', material: 'Mesh',
    price: 16499, discount: 18, stock: 22,
    image: 'https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f?w=800',
    images: ['https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f?w=800'],
    featured: true, rating: 4.7, numReviews: 96,
  },
  {
    name: 'Green Soul Monster Pro Gaming Chair',
    description: 'Racing-style gaming chair with 4D armrests, lumbar pillow, retractable footrest, 180° recline and PU leather upholstery.',
    brand: 'Green Soul', category: 'Pro Gaming Chairs', material: 'Faux Leather',
    price: 21999, discount: 30, stock: 18,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800',
    images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800'],
    featured: true, bestSeller: true, rating: 4.6, numReviews: 211,
    colors: ['Black', 'Red', 'Blue'],
  },
  {
    name: 'Godrej Interio Spruce Manager Mid-Back Chair',
    description: 'Sturdy manager chair with cushioned seat, fixed armrests, gas-lift height adjustment and durable nylon base.',
    brand: 'Godrej Interio', category: 'Workstation Chairs', material: 'Fabric',
    price: 7499, discount: 12, stock: 55,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
    images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800'],
    bestSeller: true, rating: 4.4, numReviews: 78,
  },
  {
    name: 'Talle Visitor Chair (Set of 2) — Steel Frame',
    description: 'Sturdy visitor / guest chair with cushioned seat & back, durable steel frame and stackable design. Pack of 2.',
    brand: 'Talle', category: 'Visitor Chairs', material: 'Fabric',
    price: 4999, discount: 20, wholesalePrice: 3299, wholesaleMinQty: 10, stock: 80,
    image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800',
    images: ['https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800'],
    featured: true, rating: 4.5, numReviews: 64,
  },
  {
    name: 'Wakefit Athena Mesh Office Chair',
    description: 'Breathable mesh back, contoured seat cushion, 2D adjustable armrests and smooth-glide nylon casters. Comes with 3-year warranty.',
    brand: 'Wakefit', category: 'Mesh Chairs', material: 'Mesh',
    price: 8999, discount: 22, stock: 60,
    image: 'https://images.unsplash.com/photo-1505797149-35ebcfa1c2bd?w=800',
    images: ['https://images.unsplash.com/photo-1505797149-35ebcfa1c2bd?w=800'],
    bestSeller: true, newArrival: true, rating: 4.5, numReviews: 187,
  },
  {
    name: 'Boss Chairs Premium Leather Executive Chair',
    description: 'Top-grain bonded leather executive chair with thick padding, recline lock, padded armrests and chrome aluminium base.',
    brand: 'Boss Chairs', category: 'Executive Chairs', material: 'Leather',
    price: 18999, discount: 15, stock: 14,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800',
    images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800'],
    featured: true, rating: 4.7, numReviews: 53,
  },
  {
    name: 'Durian Theater 1-Seater Recliner',
    description: 'Single-seater manual recliner with extra-deep cushion, footrest, and 160° recline. Premium fabric upholstery, lifetime mechanism warranty.',
    brand: 'Durian', category: 'Recliners', material: 'Fabric',
    price: 28999, discount: 20, stock: 8,
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800',
    images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800'],
    featured: true, newArrival: true, rating: 4.8, numReviews: 34,
  },
  {
    name: 'HOF Mid-Century Modern Accent Chair',
    description: 'Wooden-legged accent chair with velvet upholstery, button-tufted back. Perfect statement piece for living rooms.',
    brand: 'HOF', category: 'Accent Chairs', material: 'Wood',
    price: 14999, discount: 25, stock: 12,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
    images: ['https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800'],
    newArrival: true, rating: 4.6, numReviews: 28,
    colors: ['Mustard', 'Emerald', 'Navy'],
  },
  {
    name: 'Nilkamal CHR2189 Dining Chair (Set of 2)',
    description: 'Solid plastic dining chair, ergonomic curved back and broad seat. Stackable, weather-resistant, easy to clean.',
    brand: 'Nilkamal', category: 'Dining Chairs', material: 'Plastic',
    price: 2999, discount: 10, wholesalePrice: 2199, wholesaleMinQty: 20, stock: 120,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800',
    images: ['https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800'],
    bestSeller: true, rating: 4.3, numReviews: 156,
  },
  {
    name: 'Stellar Industrial Bar Stool (Pack of 2)',
    description: 'Industrial-style bar stool with metal frame, wooden seat, footrest and height-adjustable swivel. Perfect for kitchen islands & home bars.',
    brand: 'Stellar', category: 'Bar Stools', material: 'Metal',
    price: 6499, discount: 30, stock: 30,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800',
    images: ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800'],
    rating: 4.4, numReviews: 41,
  },
  {
    name: 'Spacewood Solid Sheesham Wood Cafe Chair',
    description: 'Handcrafted solid sheesham wood cafe chair with natural finish. Sturdy, timeless and built to last decades.',
    brand: 'Spacewood', category: 'Cafe Chairs', material: 'Wood',
    price: 5499, discount: 0, stock: 24,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
    images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800'],
    rating: 4.7, numReviews: 38,
  },
  {
    name: 'AmazonBasics Folding Chair (Set of 4)',
    description: 'Heavy-duty steel folding chair set with cushioned seat. Holds up to 113 kg. Folds flat for storage, ideal for events & extra guests.',
    brand: 'AmazonBasics', category: 'Folding Chairs', material: 'Metal',
    price: 4499, discount: 35, wholesalePrice: 2999, wholesaleMinQty: 10, stock: 75,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800',
    images: ['https://images.unsplash.com/photo-1503602642458-232111445657?w=800'],
    bestSeller: true, rating: 4.5, numReviews: 209,
  },
  {
    name: 'Talle Tiffany Banquet Chair — Wedding Edition',
    description: 'Elegant gold-finished tiffany chair with cushioned seat. Stackable up to 10. Designed for weddings, banquets and event halls.',
    brand: 'Talle', category: 'Banquet Chairs', material: 'Metal',
    price: 2499, discount: 12, wholesalePrice: 1699, wholesaleMinQty: 25, stock: 200,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'],
    featured: true, rating: 4.6, numReviews: 87,
    colors: ['Gold', 'Silver', 'White'],
  },
  {
    name: 'Cellbell C104 Ergonomic Office Chair — Compact',
    description: 'Affordable mesh ergonomic chair with adjustable lumbar, height and tilt-lock. Best-in-class entry-level work-from-home chair.',
    brand: 'Cellbell', category: 'Ergonomic Chairs', material: 'Mesh',
    price: 5999, discount: 40, stock: 65,
    image: 'https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f?w=800',
    images: ['https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f?w=800'],
    bestSeller: true, rating: 4.3, numReviews: 318,
  },
  {
    name: 'Kepler Brooks XL Bean Bag with Beans',
    description: 'XXL bean bag, pre-filled with high-density beans. Waterproof and tear-resistant outer cover. Perfect for kids rooms & casual lounging.',
    brand: 'Kepler Brooks', category: 'Bean Bags', material: 'Fabric',
    price: 2499, discount: 50, stock: 90,
    image: 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=800',
    images: ['https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=800'],
    bestSeller: true, newArrival: true, rating: 4.4, numReviews: 245,
    colors: ['Black', 'Brown', 'Red', 'Blue'],
  },
  {
    name: 'Misuraa Salon Hydraulic Styling Chair',
    description: 'Heavy-duty salon chair with hydraulic lift, 360° swivel, footrest and PU leather upholstery. Suitable for unisex salons & spas.',
    brand: 'Misuraa', category: 'Salon Chairs', material: 'Faux Leather',
    price: 18999, discount: 22, stock: 6,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
    images: ['https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800'],
    featured: true, rating: 4.5, numReviews: 32,
  },
  {
    name: 'Innowin Outdoor Patio Lounge Chair',
    description: 'All-weather rattan-style outdoor lounge chair with cushioned seat. UV-resistant and rust-proof aluminium frame.',
    brand: 'Innowin', category: 'Garden Chairs', material: 'Plastic',
    price: 8999, discount: 18, stock: 16,
    image: 'https://images.unsplash.com/photo-1595514535215-9a5e0e8e7d9c?w=800',
    images: ['https://images.unsplash.com/photo-1595514535215-9a5e0e8e7d9c?w=800'],
    newArrival: true, rating: 4.5, numReviews: 19,
  },
  {
    name: 'Sleepyhead Lounge Reading Chair with Ottoman',
    description: 'Mid-century scoop-back lounge chair with matching ottoman. Soft fabric upholstery and solid wood legs. Ideal reading nook companion.',
    brand: 'Sleepyhead', category: 'Lounge Chairs', material: 'Fabric',
    price: 19999, discount: 15, stock: 11,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
    images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800'],
    featured: true, rating: 4.7, numReviews: 26,
  },
  {
    name: 'Talle Reupholstery Service — Office Chair',
    description: 'Professional reupholstery service for office & executive chairs. Choose from premium mesh, fabric or leather. Doorstep pickup in Mumbai. 7-day turnaround.',
    brand: 'Talle', category: 'General', material: 'Cushion',
    price: 1999, discount: 0, stock: 999,
    image: 'https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f?w=800',
    images: ['https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f?w=800'],
    featured: true, bestSeller: true, rating: 4.9, numReviews: 412,
  },
  {
    name: 'Talle Hydraulic Cylinder Replacement (Class-4)',
    description: 'Heavy-duty BIFMA-certified class-4 hydraulic gas-lift cylinder. Universal fit for office & gaming chairs. Includes professional installation in Mumbai.',
    brand: 'Talle', category: 'General', material: 'Metal',
    price: 1299, discount: 10, wholesalePrice: 899, wholesaleMinQty: 25, stock: 300,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
    images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800'],
    bestSeller: true, rating: 4.7, numReviews: 168,
  },
  {
    name: 'Talle Premium Caster Wheels (Set of 5)',
    description: 'Smooth-glide polyurethane caster wheels — won\'t scratch hardwood floors. Universal stem fits 95% of office chairs.',
    brand: 'Talle', category: 'General', material: 'Plastic',
    price: 799, discount: 25, wholesalePrice: 499, wholesaleMinQty: 50, stock: 500,
    image: 'https://images.unsplash.com/photo-1505797149-35ebcfa1c2bd?w=800',
    images: ['https://images.unsplash.com/photo-1505797149-35ebcfa1c2bd?w=800'],
    bestSeller: true, newArrival: true, rating: 4.6, numReviews: 233,
  },
];

// Chair-shop sub-categories — mirrors frontend/src/config/departments.js.
// Each item is a sub-category Product.category can match. Kept here so the
// backend can upsert them as Category records without importing frontend code.
const CHAIR_SUBCATEGORIES = [
  // Office Chairs
  'Executive Chairs', 'Ergonomic Chairs', 'Workstation Chairs', 'Visitor Chairs',
  'Conference Chairs', 'Mesh Chairs',
  // Gaming Chairs
  'Pro Gaming Chairs', 'Racing Style Chairs', 'Streaming Chairs', 'Floor Gaming Chairs',
  // Home & Living
  'Recliners', 'Lounge Chairs', 'Accent Chairs', 'Rocking Chairs', 'Arm Chairs',
  // Dining & Cafe
  'Dining Chairs', 'Bar Stools', 'Cafe Chairs', 'Restaurant Chairs',
  // Outdoor & Garden
  'Patio Chairs', 'Garden Chairs', 'Folding Chairs', 'Beach Chairs',
  // Banquet & Event
  'Banquet Chairs', 'Wedding Chairs', 'Hotel Chairs', 'Tiffany Chairs',
  // Kids & Study
  'Study Chairs', 'Kids Chairs', 'Bean Bags',
  // Salon & Medical
  'Salon Chairs', 'Barber Chairs', 'Medical Stools', 'Wheelchairs',
  // Repair & Refurbish
  'Cushion Replacement', 'Hydraulic Repair', 'Wheel & Base Repair', 'Reupholstery',
  // Chair Accessories
  'Seat Cushions', 'Lumbar Support', 'Caster Wheels', 'Hydraulic Cylinder', 'Armrest Pads',
];

async function ensureDefaults() {
  // Always make sure "General" category and "Other" brand exist as fallbacks for quick-add
  const generalCat = await Category.findOne({ name: 'General' });
  if (!generalCat) await Category.create({ name: 'General', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600' });
  const otherBrand = await Brand.findOne({ name: 'Other' });
  if (!otherBrand) await Brand.create({ name: 'Other', logo: '' });

  // Upsert each chair-style sub-category so admin sees the full list in
  // /admin/categories and the dropdowns. Only inserts what's missing.
  // IMPORTANT: insertMany() skips pre('save') hooks, so we set slug explicitly
  // — otherwise every new doc has slug=undefined and the unique index rejects
  // the second insert with E11000 (which crashes backend startup).
  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  // Backfill any pre-existing categories that ended up with a missing/empty slug
  // (eg. created via a prior buggy insertMany). Without this, a unique-index
  // collision on the null/empty slug blocks every new insert below.
  const broken = await Category.find({
    $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
  }).select('name slug');
  for (const doc of broken) {
    if (!doc.name) continue;
    let candidate = slugify(doc.name);
    if (!candidate) continue;
    // Ensure uniqueness against existing slugs
    let n = 1;
    let unique = candidate;
    while (await Category.findOne({ slug: unique, _id: { $ne: doc._id } })) {
      unique = `${candidate}-${n++}`;
    }
    await Category.updateOne({ _id: doc._id }, { $set: { slug: unique } });
  }
  if (broken.length) console.log(`🔧 Backfilled slugs on ${broken.length} category record(s)`);

  const existing = new Set(
    (await Category.find({ name: { $in: CHAIR_SUBCATEGORIES } }).select('name')).map((c) => c.name)
  );
  const toAdd = CHAIR_SUBCATEGORIES.filter((n) => !existing.has(n));
  if (toAdd.length) {
    try {
      await Category.insertMany(
        toAdd.map((name) => ({ name, slug: slugify(name) })),
        { ordered: false } // keep going if a single doc collides on an existing slug
      );
      console.log(`🌱 Added ${toAdd.length} new sub-categories`);
    } catch (err) {
      // Don't bring the server down for a seed hiccup — log and move on.
      console.warn('⚠️  Sub-category seed had conflicts, continuing:', err.message);
    }
  }

  // One-time backfill: any COD order that's already been marked delivered but
  // somehow stayed isPaid=false should be flipped — without this the revenue
  // dashboard would forever underreport on existing orders.
  const codBackfill = await Order.updateMany(
    { paymentMethod: 'COD', status: 'delivered', isPaid: false },
    [{ $set: { isPaid: true, paidAt: { $ifNull: ['$deliveredAt', '$$NOW'] } } }]
  );
  if (codBackfill.modifiedCount > 0) {
    console.log(`💰 Backfilled isPaid on ${codBackfill.modifiedCount} delivered COD order(s)`);
  }

  // Seed default Hot Wholesale Categories tiles if none exist yet
  const wcCount = await WholesaleCategory.countDocuments();
  if (wcCount === 0) {
    await WholesaleCategory.insertMany([
      { name: 'Office Chairs',   image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400', link: '/shop?category=Executive%20Chairs', order: 1 },
      { name: 'Gaming Chairs',   image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400', link: '/shop?category=Pro%20Gaming%20Chairs', order: 2 },
      { name: 'Banquet Chairs',  image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400', link: '/shop?category=Banquet%20Chairs', order: 3 },
      { name: 'Recliners',       image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400', link: '/shop?category=Recliners', order: 4 },
    ]);
    console.log('🌱 Seeded 4 wholesale category tiles');
  }
}

// Idempotent helpers — each one only inserts what's missing. Safe to run on
// every server startup, even on a partially-seeded database.

async function seedDefaultUsersIfMissing() {
  const adminEmail = 'admin@tallefurnituremart.com';
  const customerEmail = 'customer@tallefurnituremart.com';
  if (!(await User.findOne({ email: adminEmail }))) {
    await User.create({ name: 'Admin', email: adminEmail, password: 'admin123', isAdmin: true, emailVerified: true });
    console.log('🌱 Created admin user (admin@tallefurnituremart.com / admin123)');
  }
  if (!(await User.findOne({ email: customerEmail }))) {
    await User.create({ name: 'Demo Customer', email: customerEmail, password: 'customer123', emailVerified: true });
    console.log('🌱 Created demo customer (customer@tallefurnituremart.com / customer123)');
  }
}

async function seedCategoriesIfMissing() {
  const existingNames = new Set((await Category.find().select('name')).map((c) => c.name));
  let added = 0;
  for (const c of categories) {
    if (!existingNames.has(c.name)) {
      try { await Category.create(c); added++; } catch (err) {
        console.warn(`⚠️  Could not insert category "${c.name}": ${err.message}`);
      }
    }
  }
  if (added) console.log(`🌱 Added ${added} legacy categories`);
}

async function seedBrandsIfMissing() {
  const existingNames = new Set((await Brand.find().select('name')).map((b) => b.name));
  let added = 0;
  for (const b of brands) {
    if (!existingNames.has(b.name)) {
      try { await Brand.create(b); added++; } catch (err) {
        console.warn(`⚠️  Could not insert brand "${b.name}": ${err.message}`);
      }
    }
  }
  if (added) console.log(`🌱 Added ${added} brands`);
}

async function seedProductsIfMissing() {
  const productCount = await Product.countDocuments();
  if (productCount > 0) return;
  console.log(`🌱 No products found — seeding ${products.length} demo products...`);
  let added = 0;
  for (const p of products) {
    try { await Product.create(p); added++; } catch (err) {
      console.warn(`⚠️  Could not insert product "${p.name}": ${err.message}`);
    }
  }
  console.log(`🌱 Added ${added}/${products.length} demo products`);
}

async function seedIfEmpty() {
  await ensureDefaults();
  await seedDefaultUsersIfMissing();
  await seedCategoriesIfMissing();
  await seedBrandsIfMissing();
  await seedProductsIfMissing();
  console.log('✅ Seed checks complete');
  return true;
}

module.exports = { seedIfEmpty };
