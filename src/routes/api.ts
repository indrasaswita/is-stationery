
const express = require('express');
const router = express.Router();
const users = require('../app/controllers/users');


router.use('/users', users);


module.exports = router;