const Product = require('../models/productModel')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const product_get = (req, res) => {
    res.render('record')
}
const products = () => {
    
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
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    product_get,
    product_post,
    products
}