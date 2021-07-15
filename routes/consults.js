const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('consults/index');
});

router.post('/', (req, res) => {
    req.flash('success', 'Consult Requested.');
    res.redirect("../");
});

module.exports = router;