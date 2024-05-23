const express = require('express')
const router = express.Router()
const authController = require('../controllers/authcontroller')

router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.get('/logout', authController.logout_get)
router.get('/admin_login', authController.login_admin_get)
router.post('/admin_signup', authController.admin_signup)
router.post('/admin_login', authController.login_admin_post)
module.exports = router;