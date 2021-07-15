const express = require('express');
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");
const {isLoggedIn} = require('../middleware');

router.get('/', async (req, res) => {
    const products = await Product.find({"type": "diag"});
    let productChunks = [];
    let chunkSize = 3;
    for(let i = 0; i < products.length; i+= chunkSize) productChunks.push(products.slice(i, i + chunkSize));
    res.render('diagnostics/index', {productChunks});
});

module.exports = router;