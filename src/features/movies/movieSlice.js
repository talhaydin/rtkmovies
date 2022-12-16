import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKEY } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (searchTerm) => {
    const response = await movieApi.get(
      `?apiKey=${APIKEY}&s=${searchTerm}&type=movie`
    );

    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (searchTerm) => {
    const response = await movieApi.get(
      `?apiKey=${APIKEY}&s=${searchTerm}&type=series`
    );
    return response.data;
  }
);

export const fetchDetails = createAsyncThunk(
  "movies/fetchDetails",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKEY}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  loading: false,
  movies: {},
  shows: {},
  detail: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearDetails: (state) => {
      state.detail = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state, action) => {
      return { ...state, loading: true };
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      return { ...state, movies: payload, loading: false };
    },
    [fetchAsyncMovies.rejected]: () => {},
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      return { ...state, shows: payload };
    },
    [fetchDetails.fulfilled]: (state, { payload }) => {
      return { ...state, detail: payload };
    },
  },
});

export const { clearDetails, setLoading } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getDetail = (state) => state.movies.detail;
export const getLoading = (state) => state.movies.loading;
export default movieSlice.reducer;
