const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/userController');


router.post('/auth', authUser);


module.exports = router;
