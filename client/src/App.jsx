import "./App.css";
import HomePage from "./pages/user/HomePage";
import Navbar from "./components/common/Navbar";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboardPage";
import SignUpPage from "./pages/user/SignUpPage";
import SignInPage from "./pages/user/SignInPage";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/admin/AdminLogin";
import AddMoviePage from "./pages/admin/AddMoviePage";
import AddTheaterPage from "./pages/admin/AddTheaterPage";
import TheaterListPage from "./pages/admin/TheaterListPage";
import MoviesPage from "./pages/admin/MoviesPage";
import TheaterPage from "./pages/admin/TheaterPage";
import MovieDetails from "./pages/user/MovieDetails";
import ShowTimeSelectionModal from "./components/ShowTimeSelectionModal";
import UserProfile from "./pages/user/ProfilePage";

function App() {
  return (
    <>
      <div className="glassbg"></div>
      <div className="flex flex-col w-full items-start justify-center backdrop-blur-lg h-full">
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id/:dbid" element={<MovieDetails />} />
          <Route path="/book/:id/:dbid" element={<ShowTimeSelectionModal />} />
          <Route path="/profile" element={<UserProfile />} />
          {/* admin */}
          <Route path="/a/login" element={<AdminLogin />} />
          <Route path="/a/dashboard" element={<AdminDashboard />} />
          <Route path="/a/add-movie" element={<AddMoviePage />} />
          <Route path="/a/add-theater" element={<AddTheaterPage />} />
          <Route path="/a/theaters" element={<TheaterListPage />} />
          <Route path="/a/theaters/:id" element={<TheaterPage />} />
          <Route path="/a/movies" element={<MoviesPage />} />
          <Route path="*" element={<div>Bankai</div>} />
        </Routes>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
