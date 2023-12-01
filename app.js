const express = require('express')
const app = express()
const Product = require('./models/productModel')
const morgan = require('morgan')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

// conecting to the database

mongoose.connect('mongodb://127.0.0.1:27017/nexusmall')
    .then((res) => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    Product.find()
        .then((result) => {
            res.render('home',{product: result})
        })
})
app.use(authRoutes)
app.use(productRoutes)