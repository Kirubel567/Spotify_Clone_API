const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
const Album = require("../models/Album");
const { uploadToCloudinary } = require("../utils/cloudinaryUploads");
//@desc - create a new artist
//@route - POST /api/artist
//@Access - private

const createArtist = asyncHandler(async (req, res) => {
  // check if req.body is defined
  if (!req.body) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Request body is required");
  }
  const { name, bio, genres } = req.body;
  //validation for the fiels
  if (!name || !bio || !genres) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("name, bio and genres are required");
  }
  //check if artis already exists
  const existingArtist = await Artist.findOne({ name });
  if (existingArtist) {
    throw new Error("name already exists");
  }
  //upload artist image if provided
  let imageUrl = "";
  if (req.file) {
    const result = await uploadToCloudinary(req.file.path, "spotify/artists");
    imageUrl = result.secure_url;
  }

  //   create the artist
  const artists = await Artist.create({
    name,
    bio,
    genres,
    isVerified: true,
    image: imageUrl,
  });
  res.status(StatusCodes.CREATED).json(artists); 
});

module.exports = {
    createArtist
}