const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending...'
    },
    date: {
        type: String,
        default: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
    }
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;