const mongoose = require('mongoose');
const Schema = mongoose.Schema;

appointmentSchema = new Schema({
    date: String,
    time: String,
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    symptoms: String,
    isOnline: Boolean,
    meetingLink: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;