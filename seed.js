const mongoose = require('mongoose');
const Doctor = require('./models/doctor');
const Patient = require('./models/patient');
const Appointment = require('./models/appointment');

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
        zipCode: 110078,
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
        address: "F-21, Mayur Vihar",
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
        email: "sneedhi13@gmail.com",
        address: "F-21, Mayur Vihar",
        city: "New Delhi",
        state: "Delhi",
        zipCode: 110091,
        speciality: "Oncologist",
        yoe: 4,
        rating: 5
    }
];

async function addData() {
    await Doctor.insertMany(seedDoctors);
    // await Patient.insertMany(seedPatients);
    // await Appointment.insertMany(seedAppointments);
    console.log("Added seed data.")
}

addData();



