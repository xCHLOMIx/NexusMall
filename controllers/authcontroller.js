const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const handleErrors = (err) => {
    console.log(err.message,err.code);
    let errors = { username:'',firstname: '',lastname: '',email: '',password: '' }
    if (err.code == 11000) {
        for (const key in err.keyPattern) {
            errors[key] = `${key} has already been used`
        }
        return errors;
    }
    if (err.message === 'incorrect email') {
        errors.email= 'that email is not registerd'
    }
    if (err.message === 'incorrect password') {
        errors.password= 'that password is incorect'
    }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}
const maxAge = 3*24*60*60
const createToken = (id) => {
    return jwt.sign({ id }, 'mugisha and chlomi created nexusmall', {
        expiresIn: maxAge
    })
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
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            maxAge: maxAge * 1000,
            httpOnly:true
        })
        res.status(201).json({user: user._id})

    } catch (error) {
        res.status(400).send(handleErrors(error))
        console.log(error)
    }
}
const login_post = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            maxAge: maxAge * 1000,
            httpOnly:true
        })
        res.status(200).send({user:user._id})
    } catch (error) {
        res.status(400).send(handleErrors(error));
    }
}
const logout_get = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1,
    })
    res.redirect('/')
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    logout_get,
    login_post
}