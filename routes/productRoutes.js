const express = require('express')
const router = express.Router()
const {product_details,product_get,product_post,orders} = require('../controllers/productController')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/record', product_get)
router.post('/save', upload.single('productImage'), product_post)
router.get('/orders', orders)
router.get('/:id', product_details)


router.use(productController.error)

module.exports = router;