const express = require('express');
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");
const {isLoggedIn} = require('../middleware');

router.get('/', async (req, res) => {
    const products = await Product.find({"type": "pharma"});
    let productChunks = [];
    let chunkSize = 3;
    for(let i = 0; i < products.length; i+= chunkSize) productChunks.push(products.slice(i, i + chunkSize));
    res.render('pharmacy/index', {productChunks});
});

router.get('/addToCart/:id', isLoggedIn, async (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    let product = await Product.findById(productId);
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("../");
});

module.exports = router;