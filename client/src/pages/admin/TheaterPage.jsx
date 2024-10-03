import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/adminComponents/Sidebar";
import {
  fetchTheaterById,
  fetchMovies,
  addMovieToScreen,
} from "../../services/theaterService";

const TheaterPage = () => {
  const { id } = useParams();
  const [theater, setTheater] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showtimes, setShowtimes] = useState([
    { startTime: "", endTime: "" },
    { startTime: "", endTime: "" },
    { startTime: "", endTime: "" },
    { startTime: "", endTime: "" },
    { startTime: "", endTime: "" },
  ]);
  const [playUntil, setPlayUntil] = useState(""); // Add playUntil state

  const getTheaterDetails = async () => {
    try {
      const theaterData = await fetchTheaterById(id);
      setTheater(theaterData);
    } catch (error) {
      console.error("Error fetching theater details:", error);
    }
  };

  const getMovies = async () => {
    try {
      const movieData = await fetchMovies();
      setMovies(movieData);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getTheaterDetails();
    getMovies();
  }, [id]);

  const handleAddMovie = async (screenId) => {
    if (!selectedMovie) {
      alert("Please select a movie.");
      return;
    }

    // Validate showtimes
    const validShowtimes = showtimes.filter(
      (time) => time.startTime && time.endTime
    );
    if (validShowtimes.length === 0) {
      alert("Please enter valid showtimes.");
      return;
    }

    try {
      await addMovieToScreen(
        id,
        screenId,
        selectedMovie,
        new Date(playUntil).toISOString(),
        validShowtimes
      );
      alert("Movie added to screen successfully!");
      getTheaterDetails();
      setSelectedMovie("");
      setPlayUntil(""); // Reset playUntil
      setShowtimes([
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
        { startTime: "", endTime: "" },
      ]); // Reset showtimes
    } catch (error) {
      alert("Failed to add movie to screen: " + error.message);
    }
  };

  if (!theater) {
    return <div className="text-white">Loading theater details...</div>;
  }

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex p-10 w-full bg-gray-900 items-start justify-center">
        <div className="w-1/2">
          <h1 className="text-4xl text-white mb-6">{theater.name}</h1>
          <p className="text-lg text-gray-300 mb-4">
            Location: {theater.location}
          </p>
          <h2 className="text-2xl text-white mb-4">Facilities:</h2>
          <ul className="list-disc list-inside text-gray-300 mb-6">
            {theater.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl text-white mb-4">Screens:</h2>
          <div className="w-full gap-6">
            {theater.screens.map((screen) => (
              <div
                key={screen._id}
                className="bg-gray-800 w-full text-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2">Screen {screen.name}</h3>
                <p className="text-gray-300">Capacity: {screen.capacity}</p>

                {/* Check if a movie is currently playing on the screen */}
                {screen.movie && screen.movie.movieId ? (
                  <div className="mt-4">
                    <h4 className="text-lg font-bold text-green-400">
                      Currently Playing:
                    </h4>
                    <p className="text-gray-300">
                      Movie:{" "}
                      {movies.find(
                        (movie) => movie._id === screen.movie.movieId
                      )?.title || "Unknown Movie"}
                    </p>
                    <p className="text-gray-300">
                      Play Until:{" "}
                      {new Date(screen.movie.playUntil).toLocaleDateString()}
                    </p>
                    <h4 className="text-gray-300">Showtimes:</h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {screen.showtimes.map((time, index) => (
                        <li key={index}>
                          {time.startTime} - {time.endTime}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-400 italic">
                    No movie currently playing on this screen.
                  </p>
                )}

                <div className="mt-4 w-full">
                  <label className="block text-gray-300">Select Movie:</label>
                  <select
                    value={selectedMovie}
                    onChange={(e) => setSelectedMovie(e.target.value)}
                    className="p-2 bg-gray-700 border border-gray-600 rounded-md w-full mb-2"
                  >
                    <option value="">Select a movie</option>
                    {movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.title}
                      </option>
                    ))}
                  </select>

                  {/* Showtime inputs */}
                  {showtimes.map((time, index) => (
                    <div key={index} className="mb-2">
                      <label className="block text-gray-300">
                        Showtime {index + 1}:
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="time"
                          value={time.startTime}
                          onChange={(e) => {
                            const newTimes = [...showtimes];
                            newTimes[index].startTime = e.target.value;
                            setShowtimes(newTimes);
                          }}
                          className="p-2 bg-gray-700 border border-gray-600 rounded-md w-full"
                        />
                        <input
                          type="time"
                          value={time.endTime}
                          onChange={(e) => {
                            const newTimes = [...showtimes];
                            newTimes[index].endTime = e.target.value;
                            setShowtimes(newTimes);
                          }}
                          className="p-2 bg-gray-700 border border-gray-600 rounded-md w-full"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Play Until input */}
                  <div className="mb-2">
                    <label className="block text-gray-300">Play Until:</label>
                    <input
                      type="date"
                      value={playUntil}
                      onChange={(e) => setPlayUntil(e.target.value)}
                      className="p-2 bg-gray-700 border border-gray-600 rounded-md w-full"
                    />
                  </div>

                  <button
                    onClick={() => handleAddMovie(screen._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Add Movie to Screen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterPage;
