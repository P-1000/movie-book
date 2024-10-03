import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const addTheater = async (theaterDetails) => {
  try {
    const response = await axios.post("/theater/add", theaterDetails);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const fetchTheaters = async () => {
  try {
    const response = await axios.get("/theater");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const fetchTheaterById = async (id) => {
  try {
    const response = await axios.get(`/theater/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const fetchMovies = async () => {
  try {
    const response = await axios.get("/movie");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addMovieToScreen = async (id , screenId, movieId, playUntil, showtimes) => {
  const movie ={
    movieId,
    playUntil,
    showtimes,
  }
  try {
      const response = await axios.patch(`/theater/screens/${id}`, {
          movie,
          screenId
      } );
      return response.data; // Assuming the response returns the added movie data
  } catch (error) {
      console.error("Error adding movie to screen:", error);
      throw error; // Rethrow error to be handled in the component
  }
};

export const fetchTheatersByPlayingMovie = async (movieId) => {
  try {
    const response = await axios.get(`/theater/playing/${movieId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};