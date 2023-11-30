const mongoose = require('mongoose')
const { isEmail }= require('validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please enter your username'],
        minlength: [4, 'your username should be 4 characters or more'],
        unique: true
    },
    firstname: {
        type: String,
        required: [true, 'please enter your firstname'],
    },
    lastname: {
        type: String,
        required: [true, 'please enter your lastname'],
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please provide valid email']
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength:[6,'your password should be 6 characters or more']
    }
})

const User = mongoose.model('user', userSchema)
module.exports = User;
