// routes/cart.js
const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product'); // Assuming a Product model exists
const router = express.Router();

// Add Product to Cart
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Validation
  if (!userId || !productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid product ID or quantity.' });
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
      await cart.save();
      return res.status(201).json({ message: 'Product added to cart', cart });
    }

    // Check if product is already in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      // Product already exists in the cart, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      cart.items.push({ productId, quantity });
    }

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update Cart
router.put('/update', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Validation
  if (!userId || !productId || quantity < 0) {
    return res.status(400).json({ message: 'Invalid product ID or quantity.' });
  }

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Check if the quantity is zero, remove product
    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete Product from Cart
router.delete('/delete', async (req, res) => {
  const { userId, productId } = req.body;

  // Validation
  if (!userId || !productId) {
    return res.status(400).json({ message: 'Invalid product ID or user ID.' });
  }

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Remove product from cart
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).json({ message: 'Product removed from cart', cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Cart Details
router.get('/', async (req, res) => {
  const { userId } = req.body;

  // Validation
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'Your cart is empty' });
    }

    // Calculate the total amount
    let totalAmount = 0;
    cart.items.forEach(item => {
      totalAmount += item.quantity * item.productId.price; // Assuming `price` field exists in Product model
    });

    res.status(200).json({ cart, totalAmount });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
