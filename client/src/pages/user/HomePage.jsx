import React from "react";
import Carousel from "../../components/HomeComponenets/Carousel";
import GenreCards from "../../components/HomeComponenets/GenreCards";
import PlayingMovies from "../../components/HomeComponenets/PlayingMovies";
const HomePage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full px-12 py-8">
          {/* <ContinueWatching /> */}
          <Carousel />
        </div>
        <GenreCards />
        <PlayingMovies/>
      </div>
    </>
  );
};

export default HomePage;
