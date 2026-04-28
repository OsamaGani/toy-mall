const mongoose = require('mongoose');

const wholesaleCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    // Where the tile links to. Defaults to /shop?category=<name> when blank.
    link: { type: String, default: '' },
    // Display order — smaller numbers appear first.
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WholesaleCategory', wholesaleCategorySchema);
