const { render } = require('ejs');
const Product = require('../models/productModel')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { mongoose } = require('mongoose')

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
    const id = req.params.id;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('404');
    }

    // If the id is valid, proceed with finding the product
    try {
        const product_details = await Product.findById(id);

        // Check if the product exists
        if (!product_details) {
            return res.status(404).send('Product not found');
        }

        res.render('details', { product: product_details });
    } catch (error) {
        // Handle any other errors that may occur during the database query
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
const error404 = (req,res)=>{
    res.render('404')
}
module.exports = {
    product_get,
    product_post,
    orders,
    product_details,
    error404
}