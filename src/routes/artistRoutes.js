const express = require("express");
const { createArtist, getArtists } = require("../controllers/artistController");
const { protect, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const artistRouter = express.Router();
// public routes
artistRouter.get("/",getArtists);
// Admin routes
artistRouter.post("/", protect, isAdmin, upload.single("image"), createArtist);

module.exports = artistRouter;
