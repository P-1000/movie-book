import React, { useState } from "react";
import { getMovieDetailsByTMDBId } from "../../services/movieService"; 
import { useNavigate } from "react-router-dom";
import {addMovie} from "../../services/movieService"; 

const AddMovieComponent = () => {
  const [tmdbId, setTmdbId] = useState("");
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    overview: "",
    release_date: "",
    poster_path: "",
    vote_average: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFetchMovie = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getMovieDetailsByTMDBId(tmdbId);
      setMovieDetails({
        title: response.title,
        overview: response.overview,
        release_date: response.release_date,
        poster_path: response.poster_path,
        vote_average: response.vote_average,
      });
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch movie details:", err);
      setError("Could not fetch movie details. Please check the TMDB ID.");
      setLoading(false);
    }
  };

  const handleAddMovie = async () => {
    try {
      const movieData = {
        tmdbId, 
        ...movieDetails, 
      };
      await addMovie(movieData); 
      navigate("/a/movies"); 
    } catch (error) {
      console.error("Failed to add movie:", error);
      setError("Failed to add movie. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full flex flex-col p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Add Movie</h1>

      <div className="mb-6 w-full">
        <label className="block text-sm font-medium mb-2">TMDB ID</label>
        <input
          type="text"
          value={tmdbId}
          onChange={(e) => setTmdbId(e.target.value)}
          className="mt-1 p-3 bg-gray-800/20 border border-gray-700 rounded-md w-full focus:outline-none"
          placeholder="Enter TMDB ID"
        />
        <button
          onClick={handleFetchMovie}
          disabled={loading}
          className="bg-blue-600/50 px-4 py-2 rounded-lg hover:bg-blue-700/40 transition-colors mt-4 w-full"
        >
          {loading ? "Fetching..." : "Fetch Movie Details"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {movieDetails.title && (
        <div className="w-full bg-gray-800/10 p-10 rounded-lg shadow-lg flex">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Poster</label>
            {movieDetails.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="rounded-lg h-[40rem] w-auto"
              />
            ) : (
              <div className="p-6 bg-gray-700 border border-gray-600 rounded-md text-center text-gray-400">
                No poster available
              </div>
            )}
          </div>

          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Movie Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={movieDetails.title}
                  onChange={handleChange}
                  className="mt-1 p-3 bg-gray-700/40 border border-gray-600 rounded-md w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Overview</label>
                <textarea
                  name="overview"
                  value={movieDetails.overview}
                  onChange={handleChange}
                  className="mt-1 p-3 bg-gray-700/40 border border-gray-600/20 rounded-md w-full h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Release Date</label>
                <input
                  type="text"
                  name="release_date"
                  value={movieDetails.release_date}
                  onChange={handleChange}
                  className="mt-1 p-3 bg-gray-700/40 border border-gray-600 rounded-md w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Rating</label>
                <input
                  type="text"
                  name="vote_average"
                  value={movieDetails.vote_average}
                  onChange={handleChange}
                  className="mt-1 p-3 bg-gray-700/40 border border-gray-600 rounded-md w-full"
                />
              </div>
            </div>

            <button
              onClick={handleAddMovie}
              className="mt-6 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full"
            >
              Add Movie
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>} {/* Error message for adding movie */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMovieComponent;
