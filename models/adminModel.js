const mongoose = require('mongoose')
const encrypt = require('bcrypt')
const { isEmail }= require('validator')

const adminSchema = mongoose.Schema({
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
adminSchema.pre('save', async function (next) {
    const salt = await encrypt.genSalt();
    this.password = await encrypt.hash(this.password, salt)
    next()
});

adminSchema.statics.login = async function (email, password) {
    const admin = await this.findOne({ email })
    if (admin) {
        const auth = await encrypt.compare(password, admin.password)
        if (auth) {
            return admin
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}
const Admin = mongoose.model('admin', adminSchema)
module.exports = Admin;
