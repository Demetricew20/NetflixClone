import React from 'react';
import Banner from './Banner';
import "./HomeScreen.css";
import Nav from './Nav';
import Row from './Row';
import requests from './request';


function HomeScreen() {
  return (
    <div className='homeScreen'>
        <Nav />

        <Banner />

        <Row 
        title="NETFLIX ORIGINALS"
        fetchURL = {requests.getNetflixOriginals}
        isLargeRow
        />
        <Row title="Trending Now" fetchURL={requests.getTrending} />
        <Row title="Top Rated" fetchURL={requests.getTopRatedMovies} />
        <Row title="Action Movies" fetchURL={requests.getActionMovies} />
        <Row title="Comedy Movies" fetchURL={requests.getComedyMovies} />
        <Row title="Horror Movies" fetchURL={requests.getHorrorMovies} />
        <Row title="Romance Movies" fetchURL={requests.getRomanceMovies} />
        <Row title="Documentaries" fetchURL={requests.getDocumentaries} />

    </div>
  )
}

export default HomeScreen