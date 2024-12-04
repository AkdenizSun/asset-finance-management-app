const express = require('express');
const { 
    loginController, 
    registerController 
} = require('../controllers/userController');

//router object
const router =express.Router();

//routers
//login user POST method
router.post('/login', loginController);

//register user POST method
router.post('/register', registerController)

module.exports = router;