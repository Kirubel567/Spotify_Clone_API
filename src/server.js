const express = require("express");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const artistRouter = require("./routes/artistRoutes");
//load env variables
dotenv.config();
//Initialize app
const app = express();

//Connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("error connecting to the database", err.message);
  });
//Pass in coming data, or formerly bodyParser module
app.use(express.json());
//Routes
app.use("/app/users", userRouter);
app.use("/app/artists", artistRouter);
// Error handling middleware, now the error are being send as html element, we need to send it back as a json
// 404
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = StatusCodes.NOT_FOUND;
  next(error);
});
// global error handler
app.use((err, req, res, next) => {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || "Internal Server Error",
    status: "error",
  });
});
//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("...server connected on port", PORT);
});

//added this comment fo test