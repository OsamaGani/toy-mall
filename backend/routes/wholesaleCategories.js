const express = require('express');
const asyncHandler = require('express-async-handler');
const WholesaleCategory = require('../models/WholesaleCategory');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Public — only active items, sorted by display order then name
router.get('/', asyncHandler(async (req, res) => {
  const list = await WholesaleCategory.find({ active: true }).sort({ order: 1, name: 1 });
  res.json(list);
}));

// Admin — every item including disabled, for the admin table
router.get('/all', protect, admin, asyncHandler(async (req, res) => {
  const list = await WholesaleCategory.find().sort({ order: 1, name: 1 });
  res.json(list);
}));

router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const item = await WholesaleCategory.create(req.body);
  res.status(201).json(item);
}));

router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const item = await WholesaleCategory.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  Object.assign(item, req.body);
  const updated = await item.save();
  res.json(updated);
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const item = await WholesaleCategory.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  await item.deleteOne();
  res.json({ message: 'Deleted' });
}));

module.exports = router;
