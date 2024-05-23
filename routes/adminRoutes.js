const express = require('express')
const { requireAdminAuth } = require('../middleware/middlewares')
const { product_get,product_post } = require('../controllers/productController')
const router = express.Router()
const { adminpanel_get, users, orders_get, products, orders_put, delete_product, update_product } = require('../controllers/adminController')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/dashboard', requireAdminAuth, adminpanel_get)
router.delete('/products-admin',requireAdminAuth,delete_product)
router.get('/users', requireAdminAuth, users)
router.get('/admin-orders', requireAdminAuth, orders_get)

router.post('/admin-orders', requireAdminAuth, orders_put)
router.get('/products-admin', requireAdminAuth, products)
router.get('/record', requireAdminAuth, product_get)
router.post('/save', requireAdminAuth, upload.single('productImage'), product_post)

module.exports = router;