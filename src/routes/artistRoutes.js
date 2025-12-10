const express = require("express");
const {
  createArtist,
  getArtists,
  getArtistsById,
  updatedArtist,
} = require("../controllers/artistController");
const { protect, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const artistRouter = express.Router();
// public routes
artistRouter.get("/", getArtists);
artistRouter.get("/:id", getArtistsById);
// Admin routes
artistRouter.post("/", protect, isAdmin, upload.single("image"), createArtist);
artistRouter.put(
  "/:id",
  protect,
  isAdmin,
  upload.single("image"),
  updatedArtist
);

module.exports = artistRouter;
