import axios from "axios";

// todo secure api key later
const api_key = "21958744bdcd83994642863edf06f583";

export const posterBase = "https://image.tmdb.org/t/p/original";

export const getMovieDetailsByTMDBId = async (tmdbId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${api_key}`
  );
  return response.data;
};

export const getMoviePhotos = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${api_key}`
  );
  return response.data;
};

export const constructPosterUrl = (path) => {
  return `${posterBase}${path}`;
};

export const getCast = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`
  );
  return response.data;
};

export const addMovie = async (movieData) => {
  const response = await axios.post("/movie/add", movieData);
  return response.data;
};

export const fetchMovies = async () => {
  const response = await axios.get("/movie/");
  return response.data;
};

export const getPlayingMovies = async () => {
  const response = await axios.get("/movie/playing");
  return response.data;
};

export const bookTickets = async (bookingData) => {
  const response = await axios.post("/movie/book", bookingData);
  return response.data;
};
