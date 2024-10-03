import mongoose from "mongoose";
import Theater from "../schemas/TheaterSchema.js";
import Movie from "../schemas/movieSchema.js";

export const addTheater = async (req, res) => {
  const { name, location, facilities, screens } = req.body;

  try {
    if (!name || !location || !screens) {
      return res
        .status(400)
        .json({ message: "Name, location, and screens are required" });
    }

    const newTheater = new Theater({
      name,
      location,
      facilities,
      screens,
    });

    const savedTheater = await newTheater.save();

    return res.status(201).json(savedTheater);
  } catch (error) {
    console.error("Error adding theater:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    return res.status(200).json(theaters);
  } catch (error) {
    console.error("Error getting theaters:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTheaterById = async (req, res) => {
  const { id } = req.params;

  try {
    const theater = await Theater.findById(id);
    return res.status(200).json(theater);
  } catch (error) {
    console.error("Error getting theater by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addMovieToScreen = async (req, res) => {
  const { id } = req.params;
  const { movie, screenId } = req.body;
  try {
    console.log(movie);
    const updatedTheater = await Theater.findOneAndUpdate(
      { _id: id, "screens._id": new mongoose.Types.ObjectId(screenId) },
      {
        $set: {
          "screens.$.movie": {
            movieId: movie.movieId,
            playUntil: movie.playUntil,
          },
          "screens.$.showtimes": movie.showtimes,
        },
      },
      { new: true }
    );

    if (!updatedTheater) {
      return res.status(404).json({ message: "Theater or screen not found." });
    }
    const movieData = await Movie.findById(movie.movieId);
    movieData.playingCount += 1;
    await movieData.save();
    res.status(200).json(updatedTheater);
  } catch (error) {
    console.error("Error updating screen:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getTheatersByPlayingMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    let theaters = await Theater.find({ "screens.movie.movieId": movieId });
     theaters = await Theater.find({
      "screens.movie.movieId": movieId,
      "screens.movie.playUntil": { $gte: new Date() },
    }); 

    return res.status(200).json(theaters);
  } catch (error) {
    console.error("Error getting theaters by movie:", error);
    return res.status(500).json({ message: "Server error" });
  }
};