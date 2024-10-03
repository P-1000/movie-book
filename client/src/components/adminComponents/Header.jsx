import React from "react";
import { Menu, X, Plus } from "lucide-react";

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <header className="shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white hover:text-gray-900"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-xl font-semibold text-white">Dashboard Overview</h2>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
