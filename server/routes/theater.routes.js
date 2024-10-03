import express from "express";
import { addMovieToScreen, addTheater, getTheaterById, getTheaters, getTheatersByPlayingMovie } from "../controllers/theater.controller.js";

const theaterRouter = express.Router();

theaterRouter.post("/add", addTheater);

theaterRouter.get("/", getTheaters);

theaterRouter.get("/:id", getTheaterById);

theaterRouter.patch("/screens/:id", addMovieToScreen);

theaterRouter.get("/playing/:movieId", getTheatersByPlayingMovie);




export default theaterRouter;
