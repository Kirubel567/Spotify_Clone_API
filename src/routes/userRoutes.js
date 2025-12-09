const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

//public route, no authentication needed before accessing this route
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// private routes
userRouter.get("/profile", protect, getUserProfile);
userRouter.put(
  "/profile",
  protect,
  upload.single("profilePicture"),
  updateUserProfile
);

module.exports = userRouter;
