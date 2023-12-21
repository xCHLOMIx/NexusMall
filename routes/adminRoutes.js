const express = require('express')
const { product_get,product_post } = require('../controllers/productController')
const router = express.Router()
const { adminpanel_get } = require('../controllers/adminController')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/admin', adminpanel_get)
router.get('/record', product_get)
router.post('/save', upload.single('productImage'), product_post)

module.exports = router;