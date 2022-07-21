import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import movieApi from '../../common/apis/movieApi'
import {APIKEY} from '../../common/apis/movieApiKey'

export default function Home() {
  useEffect(() => { 
    const fetchMovies = async () => {
      const movieText = "Harry"
      const response = await movieApi.get(`?apiKey=${APIKEY}&s=${movieText}&type=movie`)
      .catch((err) => {
        console.log(err);
      })
      console.log(response.data);
    }
    fetchMovies();
    
  }, [])
  return (
    <div>Home
      <div className='banner-img'></div>
      <MovieListing />
    </div>
  )
}
