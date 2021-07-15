const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../middleware');

const Patient = require('../models/patient');
const Cart = require('../models/cart');
const Appointment = require('../models/appointment');
const Order = require('../models/order');

router.get('/register', (req, res) => {
    res.render('patients/register');
});

router.post('/register', async (req, res) => {
    try{
        const {password} = req.body.patient;
        const patient = new Patient(req.body.patient);
        await patient.setPassword(password);
        await patient.save();
        req.login(patient, err => {
            if(err) return next(err);
            req.flash('success', 'Registered Successfully!');
            res.redirect('../')
        });
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
});

router.get('/login', (req, res) => {
    res.render('patients/login');
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Logged In!');
    const redirectUrl = req.session.returnTo || '../';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Successfully logged out.")
    res.redirect('/');
});

router.get('/profile', async (req, res) => {
    const orders = await Order.find({user: req.user});
    const appointments = await Appointment.find({patient: req.user}).populate('doctor');
    console.log(appointments);
    orders.forEach(function(order) {
        let cart = new Cart(order.cart);
        order.items = cart.generateArray();
    });
    res.render('patients/profile', {orders: orders, appointments: appointments});
})

module.exports = router;