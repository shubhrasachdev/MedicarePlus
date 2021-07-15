const mongoose = require('mongoose');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Appointment = require('../models/appointment');

mongoose.connect('mongodb://localhost:27017/medicarePlus', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log("Mongo Conn Open");
    })
    .catch((err) => {
        console.log("Mongo Conn Error: ");
        console.log(err);
    });

var seedDoctors = [
    {
        firstName: "Jai", 
        lastName: "Dhingra",
        email: "sawhney.ravleen@gmail.com",
        address: "E-214, Paschim Vihar",
        city: "New Delhi",
        state: "Delhi",
        zipCode: 110063,
        speciality: "Oncologist",
        yoe: 13,
        rating: 4
    },
    {
        firstName: "Mayur", 
        lastName: "Parmar",
        image: "assets/doctors/2.png",
        email: "ajaykumarsachdev@gmail.com",
        address: "G-3, Rajouri Garden",
        city: "New Delhi",
        state: "Delhi",
        zipCode: 110027,
        speciality: "Oncologist",
        yoe: 10,
        rating: 3
    },
    {
        firstName: "Raj", 
        lastName: "Arora",
        image: "assets/doctors/3.png",
        email: "shubhra99sachdev@gmail.com",
        address: "A/21, Mayur Vihar Phase 1",
        city: "New Delhi",
        state: "Delhi",
        zipCode: 110091,
        speciality: "Oncologist",
        yoe: 4,
        rating: 5
    },
    {
        firstName: "Sreenithi", 
        lastName: "Srivastav",
        image: "assets/doctors/3.png",
        email: "shubhra99sachdev@protonmail.ch",
        address: "F-21, Mayur Vihar",
        city: "New Delhi",
        state: "Delhi",
        zipCode: 110091,
        speciality: "Oncologist",
        yoe: 4,
        rating: 5
    },
    {
        firstName: "Samvat", 
        lastName: "Kumar",
        image: "assets/doctors/3.png",
        email: "sabby2999@gmail.com",
        address: "G-2, Mansarovar Garden",
        city: "New Delhi",
        state: "Delhi",
        zipCode: 110015,
        speciality: "Oncologist",
        yoe: 15,
        rating: 3
    },
    {
        firstName: "Yuga", 
        lastName: "Talwar",
        image: "assets/doctors/3.png",
        email: "yashikasharma2021@gmail.com",
        address: "AZ-13, Rohini Sector 15",
        city: "New Delhi",
        state: "Delhi",
        zipCode: 110089,
        speciality: "Oncologist",
        yoe: 5,
        rating: 2
    }
];

async function addData() {
    await Doctor.insertMany(seedDoctors);
    console.log("Added seed data.")
}

addData();



