import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { constructPosterUrl } from "../services/movieService";
import { motion } from "framer-motion";
import { useParams, useLocation } from "react-router-dom";
import ShowTimeSelectionModal from './ShowTimeSelectionModal'
import { useNavigate } from "react-router-dom";

const MovieBackdropAndInfo = ({
  backdropPath,
  id,
  title,
  runtime,
  logo,
  cast,
  overview,
  genres,
  tagline,
  networks,
  loading 
}) => {;
  const { id: movieId , dbid } = useParams();
  const location = useLocation();
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex w-full items-center rounded-[30px] relative h-[38rem] shadow-lg">
      {loading ? (
        <div className="animate-pulse w-full h-full flex flex-col items-center justify-center">
          <div className="w-full h-full bg-gray-700 rounded-3xl"></div>
          <div className="absolute w-full h-full bg-gradient-to-tr p-16 justify-end flex px-14 flex-col items-start from-black to-gray-900/20 rounded-3xl">
            <div className="w-full flex items-end justify-between">
              <div className="flex items-start flex-col w-1/2 gap-2">
                <div className="w-96 h-24 bg-gray-500 rounded-md"></div>
                <div className="w-full h-6 bg-gray-500 rounded-md"></div>
                <div className="w-full h-4 bg-gray-500 rounded-md"></div>
                <div className="flex text-sm items-center gap-3">
                  <div className="w-24 h-4 bg-gray-500 rounded-md"></div>
                  <div className="w-24 h-4 bg-gray-500 rounded-md"></div>
                  <div className="w-24 h-4 bg-gray-500 rounded-md"></div>
                </div>
                <div className="flex items-center gap-3 pt-3">
                  <div className="w-32 h-10 bg-gray-500 rounded-md"></div>
                  <div className="w-32 h-10 bg-gray-500 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <motion.img
            initial={{ opacity: 0, x: 100, skewY: 10 }}
            animate={{ opacity: 1, x: 0, skewY: 0 }}
            src={constructPosterUrl(backdropPath) || "/spiderman.jpg"}
            alt={title || "Movie Poster"}
            className="h-full rounded-3xl w-full object-cover object-top"
          />
          <div className="absolute w-full h-full bg-gradient-to-tr p-16 justify-end flex px-14 flex-col items-start from-black to-gray-900/20 rounded-3xl">
            <div className="w-full flex items-end justify-between">
              <div className="flex items-start flex-col w-1/2 gap-2">
                {logo ? (
                  <motion.img
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    src={constructPosterUrl(logo) || "/spiderman.jpg"}
                    alt={title || "Movie Logo"}
                    className="py-10 w-96 h-auto ease-in-out overflow-hidden object-contain"
                  />
                ) : (
                  <h1 className="md:text-4xl lg:text-6xl md:py-2 font-bold text-white">
                    {title}
                  </h1>
                )}
                <motion.h1
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-white/80 font-semibold"
                >
                  {tagline || ""}
                </motion.h1>
                <p className="text-sm hidden md:flex text-zinc-200">
                  {overview?.length > 200
                    ? `${overview.slice(0, 200)}...`
                    : overview}
                </p>
                <div className="flex text-sm items-center gap-3">
                  {genres &&
                    genres.map((genre, index) => (
                      <span
                        key={index}
                        className="border-gray-700 text-white py-1 rounded-full backdrop-blur-lg"
                      >
                        {genre.name} &nbsp; |
                      </span>
                    ))}
                </div>
                <div className="flex items-center gap-3 pt-3">
                  <button 
                    onClick={() => {navigate(`/book/${movieId}/${dbid}`)}}
                    className="bg-white flex items-center gap-2 text-black py-4 px-7 border text-sm font-semibold rounded-full"
                  >
                    <FaPlay className="text-sm" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <>
        {bookModalOpen && <ShowTimeSelectionModal isOpen={bookModalOpen} movieId={dbid} setIsOpen={setBookModalOpen} />}
      </>
    </div>
  );
};

export default MovieBackdropAndInfo;
