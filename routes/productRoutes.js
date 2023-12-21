const express = require('express')
const router = express.Router()
const { product_details, product_get, product_post, orders, error404, products, order } = require('../controllers/productController')
const { requireAuth, requireAdminAuth } = require('../middleware/middlewares')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/orders', requireAuth, orders)
router.post('/order', requireAuth, upload.single('productImage'), order)
router.get('/products', requireAuth, products)
router.get('/:id', requireAuth, product_details)


router.use(error404)
module.exports = router;
