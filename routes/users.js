const router = require('express').Router();
const authCheck = require('../controller/authCheck');
const authCheckAdmin = require('../controller/authCheckAdmin');
const usersController = require('../controller/users');

router.get('/', authCheckAdmin, usersController.get_users_Render);
router.post('/delete', authCheckAdmin, usersController.delete_users_Render);


module.exports = router;