const express = require('express');
const router = express.Router();

const userController = require('../app/controller/usersController')
// router.use('/view',userController.view)
router.use('/',userController.index)


module.exports = router