const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const {isLoggedIn} = require('../middleware');

router.get('/delete/:id', async(req, res) => {
    await Appointment.findByIdAndRemove(req.params.id);
    res.redirect('/patients/profile');
});

module.exports = router;