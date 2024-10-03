import React from "react";
import Sidebar from "../../components/adminComponents/Sidebar";
import MoviesList from "../../components/adminComponents/MoviesList";

const MoviesPage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <MoviesList />
    </div>
  );
};

export default MoviesPage;
