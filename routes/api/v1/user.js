const express = require('express');
// controllers
const userController = require('../../../controllers/user');
const auth = require('../../../middleware/auth');

const router = express.Router();

router.post('/login/:userId',auth.encode,userController.onUserlogin)
router.get('/fetch', userController.onGetAllUsers)
router.post('/create', userController.onCreateUser)
router.get('/:id', userController.onGetUserById)
router.delete('/delete/:id', userController.onDeleteUserById)

module.exports = router;