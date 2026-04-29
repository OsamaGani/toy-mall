const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { validateEmailFormat, generateOTP, sendVerificationOTP } = require('../utils/email');

const router = express.Router();

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });

const userPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  address: user.address,
  isAdmin: user.isAdmin,
  accountType: user.accountType,
  businessName: user.businessName,
  gstNumber: user.gstNumber,
  wholesaleApproved: user.wholesaleApproved,
  emailVerified: user.emailVerified,
  token: genToken(user._id),
});

const isDev = () => !process.env.SMTP_HOST || !process.env.SMTP_USER;

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { name, email, password, accountType, businessName, gstNumber } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

    // Validate email format + reject disposable
    const emailCheck = validateEmailFormat(email);
    if (!emailCheck.ok) return res.status(400).json({ message: emailCheck.reason });

    // Strong password — keep aligned with the frontend strength meter (PasswordInput.jsx).
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain both upper and lower case letters' });
    }
    if (!/\d/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one number' });
    }

    const exists = await User.findOne({ email: emailCheck.email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const user = await User.create({
      name,
      email: emailCheck.email,
      password,
      accountType: accountType === 'wholesale' ? 'wholesale' : 'retail',
      businessName: businessName || '',
      gstNumber: gstNumber || '',
      verificationOTP: otp,
      otpExpiresAt,
      emailVerified: false,
    });

    await sendVerificationOTP(emailCheck.email, otp, name);

    res.status(201).json({
      ...userPayload(user),
      message: 'Account created. Please verify your email with the OTP.',
      // Dev helper — exposes OTP only when no SMTP configured. Remove in production.
      ...(isDev() ? { devOTP: otp } : {}),
    });
  })
);

router.post(
  '/verify-email',
  protect,
  asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.emailVerified) return res.json({ message: 'Already verified', emailVerified: true });

    if (user.otpAttempts >= 5) {
      return res.status(429).json({ message: 'Too many wrong attempts. Resend the OTP.' });
    }
    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }
    if (!otp || user.verificationOTP !== otp.trim()) {
      user.otpAttempts += 1;
      await user.save();
      return res.status(400).json({ message: `Wrong OTP. ${5 - user.otpAttempts} attempts left.` });
    }

    user.emailVerified = true;
    user.verificationOTP = '';
    user.otpExpiresAt = undefined;
    user.otpAttempts = 0;
    await user.save();

    res.json({ message: 'Email verified successfully', emailVerified: true });
  })
);

router.post(
  '/resend-otp',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.emailVerified) return res.json({ message: 'Already verified' });

    // Throttle — once per minute
    if (user.otpExpiresAt && (user.otpExpiresAt.getTime() - Date.now()) > 9 * 60 * 1000) {
      return res.status(429).json({ message: 'Please wait a minute before requesting another OTP.' });
    }

    const otp = generateOTP();
    user.verificationOTP = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    user.otpAttempts = 0;
    await user.save();

    await sendVerificationOTP(user.email, otp, user.name);

    res.json({
      message: 'New OTP sent to your email',
      ...(isDev() ? { devOTP: otp } : {}),
    });
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (user && (await user.matchPassword(password))) {
      res.json(userPayload(user));
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  })
);

router.get(
  '/me',
  protect,
  asyncHandler(async (req, res) => {
    res.json(req.user);
  })
);

router.put(
  '/me',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.name = req.body.name || user.name;
    if (req.body.email && req.body.email !== user.email) {
      const emailCheck = validateEmailFormat(req.body.email);
      if (!emailCheck.ok) return res.status(400).json({ message: emailCheck.reason });
      const exists = await User.findOne({ email: emailCheck.email });
      if (exists) return res.status(400).json({ message: 'Email already in use' });
      user.email = emailCheck.email;
      user.emailVerified = false; // re-verify on email change
    }
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.businessName = req.body.businessName ?? user.businessName;
    user.gstNumber = req.body.gstNumber ?? user.gstNumber;
    if (req.body.password) user.password = req.body.password;
    const updated = await user.save();
    res.json(userPayload(updated));
  })
);

module.exports = router;
