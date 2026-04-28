const express = require('express');
const asyncHandler = require('express-async-handler');
const Brand = require('../models/Brand');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const list = await Brand.find().sort({ name: 1 });
  res.json(list);
}));

router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const b = await Brand.create(req.body);
  res.status(201).json(b);
}));

router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const b = await Brand.findById(req.params.id);
  if (!b) return res.status(404).json({ message: 'Not found' });
  Object.assign(b, req.body);
  const updated = await b.save();
  res.json(updated);
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const b = await Brand.findById(req.params.id);
  if (!b) return res.status(404).json({ message: 'Not found' });
  await b.deleteOne();
  res.json({ message: 'Deleted' });
}));

module.exports = router;
