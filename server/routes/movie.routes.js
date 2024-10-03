import express from "express";
import {
  addMovie,
  bookMovie,
  getAllMovies,
  getBookings,
  getPlayingMovies,
} from "../controllers/movie.controller.js";

const movieRouter = express.Router();

movieRouter.post("/add", addMovie);

movieRouter.get("/", getAllMovies);

movieRouter.get("/playing", getPlayingMovies);

movieRouter.post("/book", bookMovie);

movieRouter.get("/getbooking/:userID", getBookings);

export default movieRouter;
