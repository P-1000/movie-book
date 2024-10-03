import React, { useState, useEffect } from "react";
import { fetchTheaters } from "../../services/theaterService";
import { Link } from "react-router-dom";
const TheaterListComponent = () => {
  const [theaters, setTheaters] = useState([]);

  const getTheaters = async () => {
    try {
      const theaters = await fetchTheaters();
      setTheaters(theaters);
    } catch (error) {
      console.error("Error getting theaters:", error);
    }
  };

  useEffect(() => {
    getTheaters();
  }, []);

  return (
    <div className="px-10 min-h-screen flex flex-col ">
      <h1 className="text-4xl px-3 text-white font-semibold mb-8">Theaters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {theaters.map((theater) => (
          <Link to={`/a/theaters/${theater._id}`}>
          <div
            key={theater._id}
            className="relative border border-white/20 cursor-pointer bg-gray-800/10 text-white p-6 rounded-xl transition-transform transform hover:scale-105 hover:bg-gray-700/10  hover:shadow-gray-500/50"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500/10 via-purple-600/10 to-pink-500/10 opacity-20 rounded-lg pointer-events-none"></div>
            <h2 className="text-2xl font-extrabold mb-2">{theater.name}</h2>
            <p className="text-sm text-gray-300 mb-4">{theater.location}</p>

            <h3 className="text-lg font-semibold mb-1 text-white">
              Facilities:
            </h3>
            <ul className="flex items-center  text-gray-300">
              {theater.facilities.map((facility, index) => (
                <li key={index} className="capitalize bg-gray-200/20 px-1 text-white/80 text-sm rounded mx-1">
                  {facility}
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4 text-white">Screens:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {theater.screens.map((screen) => (
                <li key={screen._id}>
                  Screen {screen.name} - Capacity: {screen.capacity}
                </li>
              ))}
            </ul>

            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900 opacity-10 rounded-lg pointer-events-none"></div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TheaterListComponent;
