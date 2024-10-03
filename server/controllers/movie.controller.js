import Movie from "../schemas/movieSchema.js";
import Booking from "../schemas/bookingSchema.js";
import Theater from "../schemas/theaterSchema.js";
import {sendEmail} from "../utils/emailHelper.js";
import User from "../schemas/userSchema.js";
import { generateQRCode } from "../utils/qrCodeHelper.js";

export const addMovie = async (req, res) => {
  const { title, overview, release_date, poster_path, vote_average, tmdbId } =
    req.body;
  if (!title || !overview || !release_date || !poster_path || !vote_average) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const movie = new Movie({
      title,
      overview,
      release_date,
      poster_path,
      vote_average,
      tmdbId,
    });
    await movie.save();
    res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPlayingMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ playingCount: { $gt: 0 } }).sort({
      playingCount: -1,
    });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const bookMovie = async (req, res) => {
  const { movieId, screenId, theaterId, showtimeId, date, tickets, userID } = req.body;

  if (!movieId || !screenId || !theaterId || !showtimeId || !date || !tickets || !userID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch user details
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch movie details
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Fetch theater and screen details
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    const screen = theater.screens.id(screenId);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    // Fetch showtime details
    const showtime = screen.showtimes.id(showtimeId);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // Create the booking
    const booking = new Booking({
      movie: movieId,
      screen: screenId,
      theater: theaterId,
      showtime: showtimeId,
      date,
      tickets,
      user: userID,
    });

    await booking.save();

    // Update booked tickets
    screen.showtimes.id(showtimeId).bookedTickets += tickets;
    await theater.save();

    // Generate QR Code for booking ID
    const qrCode = await generateQRCode(booking._id);

    // Send booking details to the email function
    const emailSent = await sendEmail({
      to: user.email,
      name: user.name,
      qrCode,
      movieTitle: movie.title,
      theaterName: theater.name,
      screenName: screen.name,
      showtime: showtime.time,
      date,
      tickets,
    });

    if (!emailSent) {
      return res.status(500).json({ message: "Error sending email" });
    }

    // Return success response
    res.status(201).json({ message: "Booking successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};




export const getBookings = async (req, res) => {
  const { userID } = req.params;
  console.log(userID)
  try {
    const bookings = await Booking.find({ user: userID }).populate("movie theater");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
