import React, { useEffect, useState } from "react";
import { Search, Shuffle } from "lucide-react";
import Avatar from "boring-avatars";
import { SlArrowDown } from "react-icons/sl";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuthContext } from '../../context/userContext'; 

const NavbarLink = ({ name, url, onClick }) => {
  const { pathname } = useLocation();
  return (
    <Link to={url} onClick={onClick}>
      <h1
        className={`py-2 px-4 text-sm tracking-wide rounded-full ${
          pathname === url ? "bg-zinc-300/40 text-white" : "text-zinc-50"
        }`}
      >
        {name}
      </h1>
    </Link>
  );
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('bankaiuser');
    navigate('/login'); 
  };

  return (
    <div className="w-full px-28 sticky top-0 bg-transparent backdrop-blur-md z-50 flex flex-col md:flex-row items-center justify-between p-4">
      <div className="hidden md:flex flex-wrap gap-2 md:gap-4 text-zinc-200 items-center font-semibold justify-center">
        <Link to="/" className="text-2xl">Bankai</Link>
      </div>
      <form
        onSubmit={handleSearch}
        className="w-full max-w-md flex items-center border bg-zinc-700/80 text-zinc-50 border-zinc-300/30 backdrop-blur-sm shadow group py-2 focus:ring-2 rounded-full gap-2 px-4 mx-10 mb-4 md:mb-0"
      >
        <Search />
        <input
          type="text"
          className="bg-transparent text-sm focus:outline-none w-full md:w-auto"
          placeholder="Search anything"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div className="relative flex items-center gap-3 mt-4 md:mt-0">
        <div className="flex items-center cursor-pointer bg-zinc-700/80 border text-zinc-200 border-zinc-600 rounded-full gap-2 px-5 py-2" onClick={toggleMenu}>
          <Avatar size={30} name={authUser ? authUser.name : "bankai"} variant="beam" />
          <div className="flex items-start flex-col">
            <h1 className="font-semibold text-sm">{authUser ? authUser.name : "Guest"}</h1>
          </div>
          <SlArrowDown className="ml-4 text-sm" />
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 70 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-zinc-700/90 border border-zinc-600 rounded-2xl shadow-lg"
            >
              <ul className="py-2">
                <li>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-zinc-50 hover:bg-zinc-600">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-zinc-50 hover:bg-zinc-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
