const { render } = require('ejs');
const Product = require('../models/productModel')
const User = require('../models/userModel')
const checkUser = require('../middleware/middlewares')
const Order = require('../models/orderModel')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { mongoose } = require('mongoose');

const product_get = (req, res) => {
    res.render('record')
}

const product_post = async (req, res) => {
    const { productName, unitPrice, productQuantity, productDescription } = req.body;

    const product = new Product({
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        },
        productName,
        unitPrice,
        productQuantity,
        productDescription
    });
    try {
        await product.save();
        res.redirect('/record');
    } catch (err) {
        console.log(error);
        res.status(400).send('Internal Server Error');
    }
}
const currentUserId = (req) => {
    const token = req.cookies.jwt;
    
}
const orders = (req, res) => {
    Order.find()
        .then((results) => {
            const token = req.cookies.jwt;
            jwt.verify(token, 'mugisha and chlomi created nexusmall', async (err, decodeToken) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let id = decodeToken.id
                    const user = User.findById(id)
                        .then((result) => {
                            console.log(result.username);
                            let userResults =[]
                            results.forEach(userResult => {
                                console.log(userResult.userId)
                                console.log(decodeToken.id)
                                if (userResult.userId == decodeToken.id) {
                                    userResults.push(userResult)
                                }

                            });
                            res.render('orders', { orders: userResults, username: result.username, userId: user._id })
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            })
            
        }).catch((err) => {
            console.log(err);
        })

}
const order = async (req, res) => {
    const { productName, userId} = req.body
    const order = await Order.create({
        productName: productName,
        userId,
    })
    res.status(201).json({ order: order._id })
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
const products = (req,res) => {
    Product.find()
        .then((result) => {
            res.render('products', {product : result})
        })
}
module.exports = {
    product_get,
    product_post,
    orders,
    product_details,
    error404,
    order,
    products
}