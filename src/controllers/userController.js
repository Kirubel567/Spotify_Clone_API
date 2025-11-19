const asyncHandler = require('express-async-hanlder'); 
const {statusCodes} = require('http-status-codes'); 
const User = require('../models/User')
//@desc - Register a new user
//@route - POST /api/users/register


const registerUser = asyncHandler(async (requestAnimationFrame, res)=>{
    //Get the payload
    const {name, email, password} = req.body; 
    
    })