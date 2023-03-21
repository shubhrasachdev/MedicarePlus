const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config({ debug: process.env.DEBUG });
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Appointment = require('../models/appointment');

// Calendar Appointment Requirements
const readline = require('readline');
const { google } = require('googleapis');
const short = require('short-uuid');
const fs = require('fs');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';
const content = fs.readFileSync('credentials.json');
const credentials = JSON.parse(content);
const { client_secret, client_id, redirect_uris } = credentials.installed;
const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
const token = fs.readFileSync('token.json');
auth.setCredentials(JSON.parse(token));
let calendar = google.calendar({ version: 'v3', auth });
let meetingLink = "";

function dateString(d){
    function pad(n) {
        return n < 10 ? '0' + n : n
    }
    return d.getUTCFullYear()+'-'
         + pad(d.getUTCMonth() + 1)+'-'
         + pad(d.getUTCDate())+'T'
         + pad(d.getUTCHours())+':'
         + pad(d.getUTCMinutes())+':'
         + pad(d.getUTCSeconds())
}

function getStartEndDateTime(date, time) {
    const yyyy = parseInt(date.slice(0,4)), mm = parseInt(date.slice(5,7)), dd = parseInt(date.slice(8,10));
    const h = parseInt(time.slice(0,2)), m = parseInt(time.slice(3,5));
    const start = new Date(yyyy, mm - 1, dd, h, m, 0);
    const startDateTime = date + "T" + time + ":00";
    const end = new Date(start.getTime() + 30*60000 + 5.5* 60 * 60 * 1000);
    const endDateTime = dateString(end);
    return {startDateTime: startDateTime, endDateTime: endDateTime};
}


async function createCalendarEvent(start, end, symptoms, attendees, isOnline) {
    const doctor = attendees[0];
    const patient = attendees[1];
    const eventDesc =   patient.firstName + " " + patient.lastName + "'s appointment with Dr. " + 
                        doctor.firstName + " " + doctor.lastName + " for the following symptoms: \n" + symptoms;
    let event = {
        'summary': 'Medicare Plus Appointment',
        'description': eventDesc,
        'start': {
            'dateTime': start,
            'timeZone': 'Asia/Kolkata',
        },
        'end': {
            'dateTime': end,
            'timeZone': 'Asia/Kolkata',
        },
        'attendees': [
            { 'email': doctor.email },
            { 'email': patient.email },
        ],
        'reminders': {
            'useDefault': true
        },
        'visibility': 'private'
    };

    if(isOnline) {
        event.conferenceData = {
            createRequest: {requestId: short.generate()}
        }
    }
    let resp = await calendar.events.insert({ 
        auth: auth,
        calendarId: 'r7qk1asoouq5v4gorfqinhs65g@group.calendar.google.com',
        conferenceDataVersion: 1,
        resource: event,
        sendUpdates: "all"
    });
    meetingLink = resp.data.hangoutLink;
}

router.get('/', async (req, res) => {
    const doctors = await Doctor.find({});
    res.render("doctors/index", {doctors});
});

router.get('/:id/newAppointment', async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    res.render("doctors/show", {data: {doctor: doctor, isConsult: false}});
});

router.post('/:id/newAppointment', isLoggedIn, async (req, res) => {
    meetingLink = "";
    const doctorId = req.params.id;
    const patientId = req.user._id;
    const doctor = await Doctor.findById(doctorId);
    const {date, time, symptoms, type} = req.body;
    const isOnline = type === "online";
    const {startDateTime, endDateTime} = getStartEndDateTime(date, time);
    await createCalendarEvent(startDateTime, endDateTime, symptoms, [doctor, req.user], isOnline);
    const newAppointment = new Appointment({
        date: date,
        time: time,
        doctor: doctor,
        patient: req.user,
        symptoms: symptoms,
        isOnline: isOnline,
        meetingLink: meetingLink
    });
    console.log(newAppointment);
    await newAppointment.save();
    req.flash("success", "Appointment created successfully, please accept the calendar invite.");
    res.redirect("/doctors");
});



router.get('/:id/newConsult', async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    res.render("doctors/show", {data: {doctor: doctor, isConsult: true}});
});

router.post('/:id/newConsult', async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    const {name, phone, email, symptoms} = req.body;
    const docEmail = doctor.email;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });
    let emailString = 'A consultation request has been created for Dr. ' + doctor.lastName + ". \nPlease find below details for the consultation: \n\n";
    emailString += "Patient Name: " + name + "\n";
    emailString += "Patient Email: " + email + "\n";
    emailString += (phone == undefined ? "" : "Patient Phone Number: +91-" + phone + "\n");
    emailString += (symptoms == undefined ? "" : "Symptoms: " + symptoms);
    let recepients = email + ", " + docEmail;

    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: recepients,
        subject: 'Consultation Request',
        text: emailString
    };
      
    await transporter.sendMail(mailOptions, function(err, info){
        if (err) {
          console.log(err);
        } else {
           console.log('Email sent: ' + info.response);
        }
    });
    req.flash("success", "Consultation Request Created!");
    res.redirect("/doctors");
});

module.exports = router;