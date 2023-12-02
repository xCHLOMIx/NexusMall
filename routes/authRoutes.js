const express = require('express')
const router = express.Router()
const authController = require('../controllers/authcontroller')

router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.get('/admin', authController.login_admin)

module.exports = router;