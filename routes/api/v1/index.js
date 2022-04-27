const express = require('express');
const router = express.Router();
const { decode } = require('../../../middleware/auth');

const adminController = require('../../../controllers/admin');

router.get('/',(req,res)=> {
     res.send("hello");
});

// register/login admin section
router.post('/admin/register', adminController.registerAdmin);
router.post('/admin/login', adminController.loginAdmin);
router.use('/user', require('./user'));
router.use('/room', decode, require('./chatRoom'));
router.use('/delete',require('./delete'));


module.exports = router;