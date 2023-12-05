const express = require('express')
const app = express()
const Product = require('./models/productModel')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

// conecting to the database

mongoose.connect('mongodb://localhost/nexusmall')
    .then((res) => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log('not connecting to the database')
    })
//middlewares
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.get('*', checkUser)
app.get('/', requireAuth, (req, res) => {
    Product.find()
        .then((result) => {
            res.render('home',{product: result})
        })
})
app.use(authRoutes)
app.use(productRoutes)


