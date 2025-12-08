const express = require('express'); 
const userRouter =  express.Router(); 
const {registerUser, loginUser} = require('../controllers/userController'); 

//public route, no authentication needed before accessing this route
userRouter.post('/register', registerUser); 
userRouter.post('/login', loginUser); 

module.exports = userRouter; 