const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res) => {
    if(!req.session.cart) {
        return res.render('cart/index', {products: null});
    } else if(req.session.cart.totalQty == 0) return res.render('cart/index', {products: null});
    let cart = new Cart(req.session.cart);
    res.render('cart/index', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/add/:productId', async (req, res) => {
    let productId = req.params.productId;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    let product = await Product.findById(productId);
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    req.flash('success', "Added item to Cart.");
    res.redirect("/cart");
});

router.get('/remove/:productId', (req, res) => {
    let cart = new Cart(req.session.cart);
    const productId = req.params.productId;
    cart.totalQty--;
    cart.totalPrice -= cart.items[productId].item.price;
    if(--cart.items[productId].qty == 0) delete cart.items[productId];
    else {
        cart.items[productId].price -= cart.items[productId].item.price;
    }
    req.session.cart = cart;
    console.log(req.session.cart);
    req.flash('success', "Removed item from Cart.");
    res.redirect('/cart');
});

router.get('/delete/:productId', (req, res) => {
    let cart = new Cart(req.session.cart);
    const productId = req.params.productId;
    cart.totalQty -= cart.items[productId].qty;
    cart.totalPrice -= cart.items[productId].price;
    delete cart.items[productId];
    req.session.cart = cart;
    console.log(req.session.cart);
    req.flash('success', "Deleted item from Cart.");
    res.redirect('/cart');
});

router.get('/checkout', isLoggedIn, (req, res) => {
    if(!req.session.cart || req.session.cart.totalQty == 0){
        req.flash('error', "Cart is empty, nothing to checkout."); 
        return res.redirect('/cart');
    }
    res.render('cart/checkout', {totalPrice: req.session.cart.totalPrice});
});

router.post('/checkout', isLoggedIn, async (req, res) => {
    if(!req.session.cart || req.session.cart.totalQty == 0) {
        req.flash("error", "Cart is empty, nothing to checkout.");
        return res.redirect('/cart');
    }
    let cart = new Cart(req.session.cart);
    let newOrder = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name
    });
    await newOrder.save();
    req.session.cart = undefined;
    req.flash("success", "Order Placed!")
    res.redirect('/');
});

module.exports = router;