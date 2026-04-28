const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
}));

router.get('/:id', protect, admin, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}));

router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  user.isAdmin = req.body.isAdmin ?? user.isAdmin;
  const updated = await user.save();
  res.json({ _id: updated._id, name: updated.name, email: updated.email, isAdmin: updated.isAdmin });
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user._id.toString() === req.user._id.toString())
    return res.status(400).json({ message: 'Cannot delete yourself' });
  await user.deleteOne();
  res.json({ message: 'User deleted' });
}));

module.exports = router;
