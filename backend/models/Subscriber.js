const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    source: { type: String, default: 'home' }, // 'home' | 'footer' | 'admin'
    promoCode: { type: String, default: 'WELCOME10' },
    welcomeSent: { type: Boolean, default: false },
    unsubscribed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscriber', subscriberSchema);
