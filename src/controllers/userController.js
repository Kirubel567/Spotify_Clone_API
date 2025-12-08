const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const generateToken = require("../utils/generateToken");
//@desc - Register a new user
//@route - POST /api/users/register
//@Access - Public
const registerUser = asyncHandler(async (req, res) => {
  //Get the payload
  const { name, email, password } = req.body;

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("User already exists");
  }
  //else create a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(StatusCodes.CREATED).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST);
  }
});

//@desc - login user
//@route - POST /api/users/login
//@Access - Public
const loginUser = asyncHandler(async function (req, res) {
  const { email, password } = req.body;

  // get user
  const user = await User.findOne({ email });
  // check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.status(StatusCodes.OK).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePciture: user.profilePicture,
      token: generateToken(user._id),
    });
  } else {
    res.status(StatusCodes.UNAUTHORIZED); 
    throw new Error("Invalid email or password"); 
  }
});

// get user profile 

// updateUserProfile
//toggleLikedSong
//toggleFollowArtist
//toggleFollowPlaylist
//getUsers
module.exports = {
  registerUser,
  loginUser,
};
