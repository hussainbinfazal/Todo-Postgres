const express = require('express');
const router = express.Router();
const { createUser, getUser} = require('../controllers/userController');



router.post('/register', createUser);
router.get('/users', getUser);

module.exports = router;