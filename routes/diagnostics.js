const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('diagnostics/index');
});

router.get('/testing', (req, res) => {
    if(req.user.cart == undefined) req.user.cart = ["ITEM 1"];
    else {
        req.user.cart.push("Another ITEM.");
    }
    res.send("I ADDED AN ITEM!!!!");
});

router.get('/cart', (req, res) => {
    res.send("Current cart : " + req.user.cart);
})

module.exports = router;