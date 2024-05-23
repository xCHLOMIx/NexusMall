const express = require('express')
const app = express()
const Product = require('./models/productModel')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const productRoutes = require('./routes/productRoutes')
const { requireAuth, checkUser } = require('./middleware/middlewares')

// Import necessary modules and set up configurations

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error, or log it for further investigation
});
// conecting to the database

mongoose.connect('mongodb://127.0.0.1:27017/nexusmall')
    .then((res) => {
        console.log('connecting to the database')
        app.listen(4000)
    })
    .catch((err) => {
        console.log('not connecting to the database')
    })
//middlewares
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const { error404 } = require('./controllers/productController')
app.set('view engine', 'ejs')
app.get('*', checkUser)
app.get('/home', requireAuth, (req, res) => {
    Product.find()
        .then((result) => {
            console.log(typeof(result));
            res.render('home', { product: result })

        })
})
app.get('/', (req, res) => {
    Product.find()
        .then((result) => {
            res.render('index', { product: result })
        })
})
app.use(adminRoutes)
app.use(authRoutes)
app.use(productRoutes)



async function findProduct() {
    
  }
  
  findProduct();