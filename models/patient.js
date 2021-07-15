const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

patientSchema = new Schema({
    firstName: String, 
    lastName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipCode: Number
});

patientSchema.plugin(passportLocalMongoose)

 
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;