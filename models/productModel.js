const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    productName: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: String,
        required: true,
    },
    productQuantity: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);
module.exports = Product;
