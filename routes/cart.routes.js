// routes/cartRoutes.js
const express = require('express');
const cartRoutes = express.Router();

// Add to Cart
cartRoutes.post('/add', (req, res) => {
    const { productId, quantity } = req.body;
    if (!req.session.cart) req.session.cart = [];
    req.session.cart.push({ productId, quantity });
    res.json({ cart: req.session.cart });
});

// Get Cart
cartRoutes.get('/', (req, res) => {
    res.json({ cart: req.session.cart || [] });
});

module.exports = cartRoutes;