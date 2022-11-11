const express = require('express');
const router = express.Router();

const userController = require('../app/controller/usersController')
router.use('/edit',userController.edit);
router.use('/add',userController.add);
router.use('/delete',userController.delete);
router.use('/view',userController.view);
router.use('/store',userController.store);
router.use('/',userController.index);


module.exports = router;