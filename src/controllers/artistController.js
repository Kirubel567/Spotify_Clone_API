const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
const Album = require("../models/Album");
const { uploadToCloudinary } = require("../utils/cloudinaryUploads");
const { get } = require("mongoose");
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

//@desc - Get all artists with filtering and pagination
//@route - GET /api/artist?genre=Rock&search=pink&page=1 &limit=10
//@Access - public

const getArtists = asyncHandler(async (req, res) => {
  const { genre, search, page = 1, limit = 10 } = req.query;
  //build filter object
  const filter = {}; //filter object to filter query from db
  if (genre) filter.genres = { $in: [genre] };
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { bio: { $regex: search, $options: "i" } },
    ];
  }
  //Count total artists with filter
  const count = await Artist.countDocuments(filter);
  //pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  //get the artist
  const artists = await Artist.find(filter)
    .sort({ followers: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  res.status(StatusCodes.OK).json({
    artists,
    page: parseInt(page),
    pages: Math.ceil(count / parseInt(limit)),
    totalArtist: count,
  });
});

//@desc - Get a specific artist usin id
//@route - GET /api/artist/id
//@Access - public

const getArtistsById = asyncHandler(async (req, res) => {
  //get the specific artist with that id
  const artist = await Artist.findById(req.params.id);
  if (artist) {
    res.status(StatusCodes.OK).json(artist);
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Artist not found");
  }
});

//@desc - Update Artist Details
//@route - GET /api/artist/id
//@Access - private/Admin

const updatedArtist = asyncHandler(async (req, res) => {
  const { name, bio, genres, isVerified } = req.body;
  const artist = await Artist.findById(req.params.id);
  if (!artist) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Artist not found");
  }
  // update artist details
  artist.name = name || artist.name;
  artist.bio = bio || artist.bio;
  artist.genres = genres || artist.genres;
  artist.isVerified =
    isVerified !== undefined ? isVerified === "true" : artist.isVerified;

  //update the image if provided
  if (req.file) {
    const result = await uploadToCloudinary(req.file.path, "spotify/artists");
    artist.image = result.secure_url;
  }
  //resave
  const updatedArtist = await artist.save();
  res.status(StatusCodes.OK).json(updatedArtist);
});

module.exports = {
  createArtist,
  getArtists,
  getArtistsById,
  updatedArtist,
};
