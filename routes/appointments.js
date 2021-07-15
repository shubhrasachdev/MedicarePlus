const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const {isLoggedIn} = require('../middleware');

module.exports = router;