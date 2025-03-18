const express = require('express');
const paymentRoutes = express.Router();
const stripe = require('stripe')(process.env.STRIPE_API);
const { OrderModel } = require('../model/order.model');

paymentRoutes.post('/checkout', async (req, res) => {
    try {
        const { cart, userId } = req.body;

        const lineItems = cart.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: { name: item.name,
                    images: [item.image]
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));
       
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success`,
            cancel_url: `${process.env.BASE_URL}/cancel`
        });

        const newOrder = new OrderModel({ userId, products: cart, totalAmount: cart.reduce((a, c) => a + c.price * c.quantity, 0) });
        await newOrder.save();

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = paymentRoutes;