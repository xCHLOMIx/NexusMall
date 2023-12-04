const Product = require('../models/productModel')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const product_get = (req, res) => {
    res.render('record')
}

const product_post = async (req, res) => {
    const { productName, unitPrice, productQuantity } = req.body;

    const product = new Product({
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        },
        productName,
        unitPrice,
        productQuantity,
    });
    try {
        await product.save();
        res.redirect('/record');
    } catch (err) {
        console.log('error');
        res.status(400).send('Internal Server Error');
    }
}
const orders = (req, res) => {

    res.render('orders')
}
const product_details = async (req, res) => {
    const id = req.params.id
    const product_details = await Product.findById(id)
    res.render('details',{ product:product_details })
}
module.exports = {
    product_get,
    product_post,
    orders,
    product_details
}