const router = require('express').Router();
const authCheck = require('../controller/authCheck');
const authCheckAdmin = require('../controller/authCheckAdmin');
const productsController = require('../controller/products');

router.get('/', authCheck, productsController.get_products_Render);
router.get('/addProducts', authCheckAdmin, productsController.get_product_Render);
router.post('/addProducts/add', authCheckAdmin, productsController.post_product_Render);
// router.post('/add', authCheckAdmin, productsController.post_product_Render);

module.exports = router;