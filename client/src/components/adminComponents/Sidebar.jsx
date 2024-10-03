import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Film,
  Calendar,
  Building2,
  Ticket,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: <Activity size={20} />, path: "/a/dashboard" },
  { name: "Movies", icon: <Film size={20} />, path: "/a/movies" },
  { name: "Showtimes", icon: <Calendar size={20} />, path: "/a/movies" },
  { name: "Theaters", icon: <Building2 size={20} />, path: "/a/theaters" },
  { name: "Reservations", icon: <Ticket size={20} />, path: "/a/theaters" },
];

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <aside className={`fixed h-[90vh] lg:static inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="h-full flex flex-col">
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            onClick={() => handleNavigation("/settings")}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button
            className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            onClick={() => handleNavigation("/logout")}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
