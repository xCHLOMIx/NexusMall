const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'pending...'
    },
    date:{
        type: String,
        default: Date.now()
    }
})