const User = require('../models/userModel')

const handleErrors = (err) => {
    console.log(err.message)
}

const signup_get = (req, res) => {
    res.render('signup')
}
const login_get = (req, res) => {
    res.render('login')
}
const signup_post = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(req.body)
    } catch (error) {
        res.status(404).send(error)
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
    login_post
}