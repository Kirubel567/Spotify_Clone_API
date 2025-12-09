const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

//middleware to protect routes - verify jwt token and set req.user

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //check if the token exists in authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token from the header
      token = req.headers.authorization.split(" ")[1];
      // now verify the token using jwt
      const decoded = jwt.verify(token, process.env.JWT);
      // set req.user to the user found in the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("Not authorized, token failed");
    }
  }
});

module.exports = {
  protect,
};
