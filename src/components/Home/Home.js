import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import movieApi from "../../common/apis/movieApi";
import { APIKEY } from "../../common/apis/movieApiKey";
import { addMovies } from "../../features/movies/movieSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const movieText = "Star";
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await movieApi
        .get(`?apiKey=${APIKEY}&s=${movieText}&type=movie`)
        .catch((err) => {
          console.log(err);
        });
      console.log(response.data);
      dispatch(addMovies(response.data));
    };
    fetchMovies();
  }, []);
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
}
