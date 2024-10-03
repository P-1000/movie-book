import React from "react";
import { useNavigate } from "react-router-dom";

export default function QuickActionButton({ action }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(action.url);
  };

  return (
    <button
      onClick={handleClick}
      className="text-white p-6 border border-white/10 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <h3 className="font-semibold mb-1">{action.title}</h3>
      <p className="text-xs text-slate-300">Quick access to {action.title.toLowerCase()}</p>
    </button>
  );
}
