const router = require('express').Router();
const authCheck = require('../controller/authCheck');
const authCheckAdmin = require('../controller/authCheckAdmin');
const ordersController = require('../controller/orders');

router.get('/', authCheck, ordersController.get_orders_Render);
router.get('/addOrder', authCheck, ordersController.get_order_Render);
router.post('/addOrder/add', authCheck, ordersController.post_order_Render);

module.exports = router;