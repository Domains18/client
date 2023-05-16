const express = require('express');
const router = express.Router();
const { authUser,
    registerUser,
    logoutUser,
    getUserInfo,
    updateUserProfile} = require('../controllers/userController');


router.post('/', registerUser);
router.post('/register', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserInfo).put(updateUserProfile);


module.exports = router;
