const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    ageGroup: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    wholesalePrice: { type: Number, default: 0, min: 0 },
    wholesaleMinQty: { type: Number, default: 0, min: 0 },
    stock: { type: Number, required: true, default: 0 },
    images: [{ type: String }],
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    // Admin-curated flag for the homepage "Today's Deals" rail. Use this
    // for hand-picked promo items rather than relying on a discount-based
    // heuristic — gives the store owner full control over what shows.
    onDeal: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

productSchema.virtual('finalPrice').get(function () {
  return this.discount > 0 ? +(this.price - (this.price * this.discount) / 100).toFixed(2) : this.price;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

productSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
