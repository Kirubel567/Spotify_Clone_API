const jwt = require("jsonwebtoken");

// I'm using jwt here to store sessions 
// create a jwt string using the following function

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: "10d",
  });
};

module.exports = generateToken; 