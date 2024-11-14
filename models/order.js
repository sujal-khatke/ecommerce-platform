const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }],
  shippingDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
  },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  totalAmount: { type: Number, required: true }
});

// Order Model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
