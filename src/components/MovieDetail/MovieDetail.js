import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetails,
  getDetail,
  clearDetails,
} from "../../features/movies/movieSlice";
import "./MovieDetail.scss";
import { Link } from "react-router-dom";

export default function MovieDetail() {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(getDetail);

  useEffect(() => {
    dispatch(fetchDetails(imdbID));
    return () => {
      dispatch(clearDetails());
    };
  }, []);

  const handleImdbRoute = () => {
    window.location.href = `https://www.imdb.com/title/${imdbID}/`;
  };

  return (
    <div className="movie-section">
      {Object.keys(movie).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{movie.Title}</div>
            <div className="movie-rating">
              <span onClick={handleImdbRoute}>
                IMDB Rating <i className="fa fa-star"> </i> : {movie.imdbRating}
              </span>
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"> </i> :{" "}
                {movie.imdbVotes}
              </span>
              <span>
                Runtime <i className="fa fa-film"> </i> : {movie.Runtime}
              </span>
              <span>
                Year <i className="fa fa-calendar"> </i> : {movie.Year}
              </span>
            </div>
            <div className="movie-plot">{movie.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{movie.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{movie.Actors}</span>
              </div>
              <div>
                <span>Genres</span>
                <span>{movie.Genre}</span>
              </div>
              <div>
                <span>Languages </span>
                <span>{movie.Language}</span>
              </div>
              <div>
                <span> </span>
                <span>{movie.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img src={movie.Poster} alt={movie.title}></img>
          </div>
        </>
      )}
    </div>
  );
}
