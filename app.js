const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

// conecting to the database

mongoose.connect('mongodb://127.0.0.1:27017/NexusMall')
    .then((res) => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })
app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    // you did not give me the home page
    res.render('home')
})
app.use(authRoutes)
app.use(productRoutes)