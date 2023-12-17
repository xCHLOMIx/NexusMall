const express = require('express')
const router = express.Router()
const {product_details,product_get,product_post,orders, error404, products} = require('../controllers/productController')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/record', product_get)
router.post('/save', upload.single('productImage'), product_post)
router.get('/orders', orders)
router.get('/products', products)
router.get('/:id', product_details)


router.use(error404)

module.exports = router;
