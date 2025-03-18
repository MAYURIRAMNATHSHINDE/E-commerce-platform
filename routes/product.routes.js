const express = require('express');
const productRoutes = express.Router();
const { ProductModel } = require('../model/product.model');

// Get all products
productRoutes.get('/get', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports={productRoutes}