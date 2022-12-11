import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKEY } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Star";
    const response = await movieApi.get(
      `?apiKey=${APIKEY}&s=${movieText}&type=movie`
    );
    console.log(response.data);
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const showsText = "Star Wars";
    const response = await movieApi.get(
      `?apiKey=${APIKEY}&s=${showsText}&type=series`
    );
    console.log(response.data);
    return response.data;
  }
);

export const fetchDetails = createAsyncThunk(
  "movies/fetchDetails",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKEY}&i=${id}&Plot=full`);
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  detail: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearDetails: (state) => {
      state.detail = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state, action) => {
      console.log("pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("fulfilled");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("fulfilled");
      return { ...state, shows: payload };
    },
    [fetchDetails.fulfilled]: (state, { payload }) => {
      return { ...state, detail: payload };
    },
  },
});

export const { clearDetails } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getDetail = (state) => state.movies.detail;
export default movieSlice.reducer;
