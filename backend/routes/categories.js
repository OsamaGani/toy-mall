const express = require('express');
const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const list = await Category.find().sort({ name: 1 });
  res.json(list);
}));

router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const cat = await Category.create(req.body);
  res.status(201).json(cat);
}));

router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id);
  if (!cat) return res.status(404).json({ message: 'Not found' });
  Object.assign(cat, req.body);
  const updated = await cat.save();
  res.json(updated);
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id);
  if (!cat) return res.status(404).json({ message: 'Not found' });
  await cat.deleteOne();
  res.json({ message: 'Deleted' });
}));

module.exports = router;
