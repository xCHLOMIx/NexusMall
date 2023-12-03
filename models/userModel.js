const mongoose = require('mongoose')
const encrypt = require('bcrypt')
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
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}
const User = mongoose.model('user', userSchema)
module.exports = User;
