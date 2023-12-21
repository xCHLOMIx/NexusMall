const mongoose = require('mongoose')
const encrypt = require('bcrypt')
const { isEmail }= require('validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        minlength: [4, 'Your username should be 4 characters or more'],
        unique: true
    },
    firstname: {
        type: String,
        required: [true, 'Please enter your firstname'],
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your lastname'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please provide valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength:[6,'Your password should be 6 characters or more']
    }
})
userSchema.pre('save', async function (next) {
    const salt = await encrypt.genSalt();
    this.password = await encrypt.hash(this.password, salt)
    next()
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await encrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}
const User = mongoose.model('user', userSchema)
module.exports = User;
