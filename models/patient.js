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
    zipCode: Number,
    appointments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ]
});

patientSchema.plugin(passportLocalMongoose)

 
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;