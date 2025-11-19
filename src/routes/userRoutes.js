const express = require('express'); 
const userRouter =  express.Router(); 
const {registerUser} = require('../controllers/userController'); 

//public route, no authentication needed before accessing this route
userRouter.post('/register', registerUser); 

module.exports = userRouter; 