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
    rating: Number,
    availableSlots: {
        type: [String],
        default: [
            "0900", "0930", "1000", "1030", "1100", "1130", "1200", "1230",
            "1300", "1330", "1400", "1430", "1500", "1530", "1600", "1630",
            "1700", "1730", "1800", "1830", "1900", "1930", "2000", "2030"
        ]
    },
    appointments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ]
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;