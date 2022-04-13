import React from "react";
import { useEffect } from "react";
import "./App.css"

import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard"
import { useState} from "react";

// OMDB API key :dbf89066
const API_URL = "https://omdbapi.com?apikey=dbf89066";

function App(){
  const [movies, setMovies] = useState([]);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    searchMovies('salt');
  },[]);
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };


  return(
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input 
        placeholder="Search for Movies"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <img src={SearchIcon} 
        alt="search"  
        onClick={() => searchMovies(search)}/>
      </div>

        {movies?.length>0
          ?(
            <div className="container">
              {
                movies.map ((movie) =>(
                  <MovieCard movie = {movie}/>
                ))
              }
            </div>
            ):(
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )}

    </div>
  );
};

export default App;