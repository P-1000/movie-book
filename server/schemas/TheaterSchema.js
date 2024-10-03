import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  bookedTickets: { type: Number, default: 0 },
});

const screenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  facilities: [{ type: String }],
  showtimes: [showtimeSchema],
  movie: {
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    playUntil: Date,
  },
});

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  facilities: [{ type: String }],
  screens: [screenSchema],
});

const Theater = mongoose.models.Theater || mongoose.model('Theater', theaterSchema);

export default Theater;