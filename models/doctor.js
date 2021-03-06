const mongoose = require('mongoose');
const Schema = mongoose.Schema;

doctorSchema = new Schema({
    firstName: String, 
    lastName: String,
    image: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipCode: Number,
    speciality: String,
    yoe: Number,
    rating: Number
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;