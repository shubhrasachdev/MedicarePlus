const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const {isLoggedIn} = require('../middleware');

router.post('/new/:id', isLoggedIn, async (req, res) => {
    const doctorId = req.params.id;
    const patientId = req.user.id;
    const newAppointment = {
        date: String,
        time: String,
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        patientId: {
            type: Schema.Types.ObjectId,
            ref: 'Patient'
        },
        symptoms: String,
        isOnline: Boolean,
        meetingLink: String
    }

    res.send(req.body);
});

module.exports = router;