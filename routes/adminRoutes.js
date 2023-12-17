const express = require('express')
const router = express.Router()
const { adminpanel_get } = require('../controllers/adminController')

router.get('/admin', adminpanel_get)

module.exports = router;