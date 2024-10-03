import React, { useState, useEffect } from "react";
import { fetchTheatersByPlayingMovie } from "../services/theaterService";
import { getMovieDetailsByTMDBId, getMoviePhotos } from "../services/movieService";
import { useParams } from "react-router-dom";
import { bookTickets } from "../services/movieService";
import { useAuthContext } from "../context/userContext";
import { constructPosterUrl } from "../services/movieService";

const ShowTimeSelectionModal = ({ setIsOpen }) => {
  const [theaters, setTheaters] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [movie, setMovie] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const { dbid: movieId, id } = useParams();
  const { authUser } = useAuthContext();
  const [logo, setLogo] = useState("");

  // console.log(authUser);
  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await fetchTheatersByPlayingMovie(movieId);
        console.log(response);
        setTheaters(response);
      } catch (error) {
        console.error("Error fetching theaters by playing movie:", error);
      }
    };

    const fetchMovie = async () => {
      try {
        const movieData = await getMovieDetailsByTMDBId(id);
        setMovie(movieData);
        console.log(movieData);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovie();
    fetchTheaters();
    fetchPhotos();
  }, [id, movieId]);

  const handleShowtimeSelect = (showtime) => {
    console.log(showtime);
    setSelectedShowtime(showtime);
    setSelectedDate('');
  };
  

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedShowtime) {
      alert("Please select a showtime and date.");
    } else {
      setShowTicketModal(true);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await getMoviePhotos(id);
      const { logos } = response;
      const filteredLogos = logos.filter((logo) => logo.iso_639_1 === "en");
      setLogo(filteredLogos[0]?.file_path);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="bg-gra min-h-screen  w-full text-white">
      <h2 className="text-3xl text-center font-bold px-4 py-4">
        Select Showtime and Date
      </h2>
      {movie && (
        <div className="text-center mx-10 flex gap-6 p-4 bg-gray-800/50 rounded-2xl">
          <img
            src={constructPosterUrl(movie.backdrop_path)}
            alt={`${movie.title} poster`}
            className="mx-auto w-[60%] my-4 rounded-xl"
          />
          <div className="flex flex-col items-start justify-around gap-3">
            {/* <h3 className="text-xl font-bold">{movie.title}</h3> */}
            <img src={constructPosterUrl(logo)} alt="Movie Logo" className="w-[90%] mx-auto" />
            <p className="text-start">{movie.overview}</p>
          </div>
        </div>
      )}
      <div className="h-full mx-10 overflow-auto">
        {theaters.length > 0 ? (
          theaters.map((theater, index) =>
            theater.screens
              .filter((screen) => screen.movie.movieId === movieId)
              .map((screen, screenIndex) => (
                <div
                  key={`theater-${index}-screen-${screenIndex}`}
                  className="m-4 p-4 bg-gray-800/50 rounded-md"
                >
                  <div>
                    <div className="flex items-center gap-2">
                    <p className="text-2xl">Screen {screen.name}</p>
                    <p className="bg-zinc-100 text-black text-md border px-4 py-2 rounded-lg ">
                      Play Until: {new Date(screen.movie.playUntil).toDateString()}
                    </p>
                    </div>
                    <div className="flex gap-2 my-4 items-center justify-center flex-wrap">
                      {screen.showtimes.map((showtime, showtimeIndex) => (
                        <button
                          key={`showtime-${showtimeIndex}`}
                          onClick={() => handleShowtimeSelect(showtime)}
                          className={`p-2 rounded-md max-w-56 ${
                            selectedShowtime === showtime
                              ? "bg-blue-500/40"
                              : "bg-gray-700/20 border"
                          }`}
                        >
                          {showtime.startTime} - {showtime.endTime}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 w-full justify-center items-center">

                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      min={new Date().toISOString().split("T")[0]}
                      max={
                        new Date(screen.movie.playUntil)
                        .toISOString()
                        .split("T")[0]
                      }
                      className="p-2 bg-gray-700 rounded-md"
                      />
                    <button
                      onClick={handleSubmit}
                      className="p-2 bg-blue-500 hover:bg-blue-400 rounded-md"
                      >
                      Confirm Selection
                    </button>
                      </div>
                  </div>
                </div>
              ))
          )
        ) : (
          <p className="px-4">No theaters available for this movie</p>
        )}
      </div>
      {showTicketModal && (
        <TicketSelectionModal 
          details={theaters}
          movieId={movieId}
          screenId={selectedShowtime}
          selectedShowtime={selectedShowtime}
          selectedDate={selectedDate}
          setShowTicketModal={setShowTicketModal}
          setIsOpen={setIsOpen}
          authUser={authUser}
        />
      )}
    </div>
  );
};

const TicketSelectionModal = ({ details, selectedShowtime, movieId, authUser, selectedDate, setShowTicketModal, setIsOpen }) => {
  const [ticketCount, setTicketCount] = useState(1);

  const handleTicketClick = (count) => {
    setTicketCount(count);
  };

  const handleTicketConfirmation = () => {
    const theaterId = details.find(theater => 
      theater.screens.some(screen => 
        screen.showtimes.some(showtime => showtime._id === selectedShowtime._id)
      )
    )._id; // Fetching correct theater ID

    const screenId = details.flatMap(theater => 
      theater.screens
    ).find(screen => 
      screen.showtimes.some(showtime => showtime._id === selectedShowtime._id)
    )._id; // Fetching correct screen ID

    const bookingDetails = {
      movieId,
      theaterId,
      screenId,
      showtimeId: selectedShowtime._id,
      date: selectedDate,
      tickets: ticketCount,
      userID: authUser.id,
    };

    console.log(bookingDetails);

    bookTickets(bookingDetails)
      .then((response) => {
        if (response.success) {
          setShowTicketModal(false);
          setIsOpen(false);
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        console.error("Failed to book tickets:", error);
      });
  };
  const getImageForTickets = (count) => {
    switch (count) {
      case 1:
        return "https://img.icons8.com/?size=100&id=15128&format=png&color=000000"; // Replace with actual image path or URL
      case 2:
        return "https://img.icons8.com/?size=100&id=cUnsXrpRV0dh&format=png&color=000000";
      case 3:
        return "https://img.icons8.com/?size=100&id=Y0mG4nTnJTYg&format=png&color=000000";
      case 4:
        return "https://img.icons8.com/?size=100&id=15126&format=png&color=000000";
      case 5:
        return "https://img.icons8.com/?size=100&id=46817&format=png&color=000000";
      default:
        return "default.png";
    }
  };

  const getButtonColor = (count) => {
    return count === ticketCount ? "bg-green-500" : "bg-blue-500";
  };

  return (
    <div className="bg-gray-700/40 backdrop-blur absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
      <div className="background-modal bg-white p-8 flex rounded-3xl">
        <div className="card p-4 rounded-md text-white">
          <h2 className="text-2xl text-black mb-4">Select your tickets</h2>

          {/* Display the image for the current selection */}
          <div className="image-container items-center flex justify-center mb-4">
            <img
              src={getImageForTickets(ticketCount)}
              alt="Selected Transport"
              className="w-32 h-32"
            />
          </div>

          {/* Ticket selection buttons */}
          <div className="ticket-options">
            {[1, 2, 3, 4, 5].map((count) => (
              <button
                key={count}
                className={`p-2 px-4  ${getButtonColor(
                  count
                )} hover:bg-blue-400 rounded-full mr-2 ${
                  count === ticketCount ? "active" : ""
                }`}
                onClick={() => handleTicketClick(count)}
              >
                {count}
              </button>
            ))}
          </div>

          {/* Confirm button */}
          <button
            className="w-full p-2 bg-blue-500 hover:bg-blue-400 rounded-md mt-4"
            onClick={handleTicketConfirmation}
          >
            Confirm Tickets
          </button>
          <button
            className="w-full p-2 bg-red-500 hover:bg-red-400 rounded-md mt-4"
            onClick={() => setShowTicketModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowTimeSelectionModal;
