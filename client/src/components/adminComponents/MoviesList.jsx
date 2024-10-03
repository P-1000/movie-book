import React, { useState, useEffect } from "react";
import { fetchMovies } from "../../services/movieService"; // Update the path according to your file structure
import { Link } from "react-router-dom";

const MovieListComponent = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getMovies = async () => {
    try {
      const movies = await fetchMovies();
      setMovies(movies);
    } catch (error) {
      console.error("Error getting movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-10 min-h-screen flex flex-col w-full">
      <h1 className="text-4xl px-3 text-white font-semibold mb-8">Movies</h1>

      <div className="mb-6 flex gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 bg-gray-700/40 border border-gray-600 rounded-md w-full"
        />
        <Link to="/admin/add-movie" className="">
          <button className="bg-green-600 whitespace-nowrap text-white px-8 h-full rounded-md hover:bg-green-700">
            Add Movie
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-5">
        {filteredMovies.length === 0 ? (
          <p className="text-white text-center">No movies found.</p>
        ) : (
          filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className="relative w-[45%] flex gap-4 cursor-pointer bg-gray-800/20 text-white p-6 rounded-lg shadow-xl transition-transform transform hover:bg-gray-700/10 hover:shadow-2xl hover:shadow-gray-500/30"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="w-1/3 object-cover rounded-md mb-4"
              />
              <div className="flex flex-col gap-2 items-start">
                <h2 className="text-2xl font-extrabold mb-2">{movie.title}</h2>
                <h3 className="text-md font-semibold mb-1 text-white">
                  Description:
                </h3>
                <p className="text-gray-300 text-sm">{movie.overview}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900 opacity-10 rounded-lg pointer-events-none"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieListComponent;
