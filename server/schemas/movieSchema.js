import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  release_date: { type: String, required: true },
  poster_path: { type: String, required: true },
  vote_average: { type: Number, required: true },
  tmdbId: { type: Number, required: true },
  playingCount: { type: Number, default: 0 },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
