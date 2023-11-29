const User = require('../models/userModel')

const signup_get = (req, res) => {
    res.render('signup')
}
const login_get = (req, res) => {
    res.render('login')
}
const signup_post = async (req, res) => { 
    const {username, firstname, lastname, email, password } = req.body
    const user = User.create(req.body)
    res.status(201).json(req.body) 
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