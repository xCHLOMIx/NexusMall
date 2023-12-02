const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/record', productController.product_get)
router.post('/save', upload.single('productImage'), productController.product_post)
router.get('/', productController.product_display)

module.exports = router;