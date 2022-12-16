import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import { useDispatch } from "react-redux";
import "./Header.scss";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import Swal from "sweetalert2";

const Header = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      Swal.fire({
        title: "Error!",
        text: "Your search input is empty",
        icon: "error",
        confirmButtonText: "Try again",
      });
    } else {
      dispatch(fetchAsyncMovies(searchTerm));
      dispatch(fetchAsyncShows(searchTerm));
    }
  };
  return (
    <div className="header">
      <div>
        <Link to="/">
          <div className="logo">Dizzney Crust</div>
        </Link>
      </div>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Movies or Shows"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button>
            {" "}
            <i className="fa fa-search"> </i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
