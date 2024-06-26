const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = ( req, res, next ) => {
    const token = req.cookies.jwt

    // check if jwt exists
    if ( token ) {
        jwt.verify(token, 'mugisha and chlomi created nexusmall', ( err, decodeToken ) => {
            if (err) {
               
                res.redirect('/login')
                console.log(err);
            }
            else {
                
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}
const requireAdminAuth = ( req, res, next ) => {
    const token = req.cookies.jwt_admin

    // check if jwt exists
    if ( token ) {
        jwt.verify(token, 'mugisha and chlomi created nexusmall', ( err, decodeToken ) => {
            if (err) {
               
                res.redirect('/admin_login')
                console.log(err);
            }
            else {
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'mugisha and chlomi created nexusmall', async(err, decodeToken) => {
            if (err) {

                res.locals.user = null
                console.log(err);
                next();
            }
            else {
                
                user = await User.findById(decodeToken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else {
        res.locals.user = null
        next()
    }
}
module.exports = {
    requireAuth,
    checkUser,
    requireAdminAuth
}