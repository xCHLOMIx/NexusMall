const User = require('../models/userModel')

const handleErrors = (err) => {
    if (err.message.includes('user validation failed')) {
        let errorObject = { username: '', email: '', password: '' }
        Object.values(err.errors).forEach(({properties}) => {
            
            errorObject[properties.path] = properties.message
        })
        console.log(errorObject);
    }
    
}

const signup_get = (req, res) => {
    res.render('signup')
}
const login_get = (req, res) => {
    res.render('login')
}
const login_admin = (req, res) => {
    res.render('admin')
}    
const signup_post = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(req.body)
    } catch (error) {
        handleErrors(error)
    }
}
const login_post = (req, res) => {
    const { username, password } = req.body
    console.log(username,password);
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    login_admin
}