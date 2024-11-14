const express = require('express');
const Order = require('./../models/order');
const Cart = require('./../models/cart');
const Product = require('./../models/product');
const router = express.Router();

// Place Order - Endpoint: /placeorder
router.post('/placeorder', async (req, res) => {
    try {
        const { customerId, shippingDetails } = req.body;

        // Validate that the cart exists and belongs to the customer
        const cart = await Cart.findOne({ userId: customerId }); // or Cart.findOne({ customerId })
        console.log(cart); // Add a log here to see the fetched cart
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty or does not exist.' });
        }
        // Calculate the total amount
        let totalAmount = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            if (product) {
                totalAmount += product.price * item.quantity;
            }
        }

        // Generate a unique order ID
        const orderId = `ORD-${new Date().getTime()}-${Math.floor(Math.random() * 10000)}`;

        // Create a new order
        const newOrder = new Order({
            customerId,
            cartItems: cart.items,
            shippingDetails,
            totalAmount
        });

        // Save the order to the database
        await newOrder.save();

        // Clear the cart after placing the order
        await Cart.updateOne({ customerId }, { $set: { items: [] } });

        res.status(201).json({
            message: 'Order placed successfully',
            orderId: orderId,
            order: newOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get All Orders - Endpoint: /getallorders
router.get('/getallorders', async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId').populate('cartItems.productId');

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Orders by Customer ID - Endpoint: /orders/customer/:customerId
router.get('/orders/customer/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;

        const orders = await Order.find({ customerId }).populate('cartItems.productId');

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this customer.' });
        }

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
