import React, { useEffect, useState } from 'react';
import "./Banner.css";
import axios from "./axios";
import requests from "./request";

function Banner() {

    const [movie, setMovie] = useState([]);

    function truncate(string, n){
        return string?.length > n ? string.substring(0, n - 1) + "..." : string;
    }

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.getNetflixOriginals)
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request
        }

        fetchData();
    }, []);


  return (
    <header className='banner' style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
    }}>
        <div className='banner__contents'>
            <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className='banner__buttons'>
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>
            </div>     
            <h1 className='banner__description'>
            {truncate(movie?.overview, 150)}
            </h1>
        </div>
        {/* USE DASH TO SHOW THIS IS A MODIFIER CLASS */}
        <div className='banner--fadeBottom' />
    </header>
  )
}

export default Banner