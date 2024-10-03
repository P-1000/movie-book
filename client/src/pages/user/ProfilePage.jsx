import React, { useState, useEffect } from "react";
import { CalendarDays, MapPin, Film, Star, Settings, LogOut } from "lucide-react";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [userBookings, setUserBookings] = useState([]);
  const userID = "66fe662ffc7eca3751414cb7"; // Use the logged-in user ID here

  useEffect(() => {
    // Fetch bookings from the backend
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movie/getbooking/${userID}`);
        const data = await response.json();
        setUserBookings(data); // Populate bookings dynamically
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };

    fetchBookings();
  }, [userID]);

  const favoriteTheaters = ["Cineplex", "AMC", "Regal"];
  const favoriteGenres = ["Sci-Fi", "Action", "Drama"];

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4">
          <div className="bg-white/10 rounded-lg shadow">
            <div className="px-5 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  className="rounded-full w-20 h-20"
                  src="/placeholder-avatar.jpg"
                  alt="User's avatar"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-gray-500">john.doe@example.com</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-4">
              <nav className="flex flex-col space-y-1">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full text-left px-3 py-2 rounded ${
                    activeTab === "bookings" ? "bg-gray-100/10 text-gray-900" : "text-gray-600"
                  }`}
                >
                  <CalendarDays className="inline-block mr-2" /> Bookings
                </button>
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`w-full text-left px-3 py-2 rounded ${
                    activeTab === "favorites" ? "bg-gray-100/10 text-gray-900" : "text-gray-600"
                  }`}
                >
                  <Star className="inline-block mr-2" /> Favorites
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-3 py-2 rounded ${
                    activeTab === "settings" ? "bg-gray-100/10 text-gray-900" : "text-gray-600"
                  }`}
                >
                  <Settings className="inline-block mr-2" /> Settings
                </button>
              </nav>
            </div>
            <div className="px-5 py-4 border-t border-gray-200">
              <button className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded hover:bg-gray-100">
                <LogOut className="inline-block mr-2" /> Log out
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          {activeTab === "bookings" && (
            <div className="bg-white/10 rounded-lg shadow">
              <div className="px-5 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-slate-100">Your Bookings</h2>
                <p className="text-gray-300">View and manage your movie bookings</p>
              </div>

              <div className="p-5">
                {userBookings.length > 0 ? (
                  userBookings.map((booking) => (
                    <div key={booking._id} className="mb-4 p-4 bg-slate-50/10 rounded-lg shadow">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {booking.movie.title} {/* Assuming movie has title */}
                      </h3>
                      <div className="flex space-x-4 mb-4">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${booking.movie.poster_path}`}
                          alt={booking.movie.title}
                          className="w-32 h-48 object-cover rounded"
                        />
                        <div>
                          <p className="text-gray-300">
                            <CalendarDays className="inline-block mr-2" />
                            {new Date(booking.date).toLocaleDateString()} at{" "}
                            {booking.theater.screens[0].showtimes.find(
                              (showtime) => showtime._id === booking.showtime
                            )?.startTime}
                          </p>
                          <p className="text-gray-300">
                            <MapPin className="inline-block mr-2" />
                            {booking.theater.name}, {booking.theater.location}
                          </p>
                          <p className="text-gray-300 mt-2">
                            Tickets: {booking.tickets}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking._id}`}
                          alt={`QR Code for ${booking.movie.title}`}
                          className="w-32 h-32"
                        />
                      </div>
                      <button className="mt-4 px-4 py-2 w-full bg-gray-900/50 text-white rounded hover:bg-gray-800">
                        View Ticket Details
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No bookings found.</p>
                )}
              </div>
            </div>
          )}
          {activeTab === "favorites" && (
            <div className="bg-white rounded-lg shadow">
              {/* Favorites Section */}
            </div>
          )}
          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow">
              {/* Settings Section */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
