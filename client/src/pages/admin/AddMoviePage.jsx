import React from "react";
import Sidebar from "../../components/adminComponents/Sidebar";
import AddMovieComponent from "../../components/adminComponents/AddMovieComponent";

const AddMoviePage = () => {
  return (
    <div className="flex w-full">
      <div className="fixed top-20 left-0 h-full w-64">
        <Sidebar />
      </div>

      <div className="ml-64 w-full overflow-auto ">
        <AddMovieComponent />
      </div>
    </div>
  );
};

export default AddMoviePage;
