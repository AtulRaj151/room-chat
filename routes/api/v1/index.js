const express = require('express');
const router = express.Router();

const adminController = require('../../../controllers/admin');

router.get('/',(req,res)=> {
     res.send("hello");
});

// register/login admin section
router.post('/admin/register',adminController.registerAdmin);
router.post('/admin/login',adminController.loginAdmin);



module.exports = router;