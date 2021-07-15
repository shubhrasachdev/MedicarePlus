const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'}, 
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, requires: true}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;