const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    products: [{
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number
    }],
    totalAmount: Number,
    paymentStatus: { type: String, default: 'Pending' }
});

const OrderModel=mongoose.model('Order', orderSchema);


module.exports = {OrderModel}