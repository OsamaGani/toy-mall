const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  image: String,
  price: Number,
  qty: { type: Number, required: true, min: 1 },
  isWholesalePrice: { type: Boolean, default: false },
});

const statusEvent = new mongoose.Schema({
  status: String,
  note: String,
  at: { type: Date, default: Date.now },
}, { _id: false });

const ORDER_STATUSES = ['pending', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: String,
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      phone: String,
    },
    paymentMethod: { type: String, default: 'COD' },
    paymentResult: {
      id: String,
      status: String,
      updateTime: String,
      email: String,
    },
    accountType: { type: String, enum: ['retail', 'wholesale'], default: 'retail' },
    itemsPrice: Number,
    shippingPrice: { type: Number, default: 0 },
    taxPrice: { type: Number, default: 0 },
    totalPrice: Number,
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'pending',
    },
    statusHistory: [statusEvent],
    estimatedDelivery: Date,
    trackingNumber: String,
  },
  { timestamps: true }
);

orderSchema.pre('save', function (next) {
  if (this.isNew) {
    this.orderNumber = 'TM' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
    this.statusHistory = [{ status: 'pending', note: 'Order placed successfully', at: new Date() }];
    const days = this.accountType === 'wholesale' ? 7 : 5;
    this.estimatedDelivery = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
  next();
});

orderSchema.statics.STATUSES = ORDER_STATUSES;

module.exports = mongoose.model('Order', orderSchema);
