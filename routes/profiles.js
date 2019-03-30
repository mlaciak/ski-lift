const router = require('express').Router();
const authCheck = require('../controller/authCheck');
const profileController = require('../controller/profiles');

router.get('/', authCheck, profileController.get_profile_Render);

module.exports = router;