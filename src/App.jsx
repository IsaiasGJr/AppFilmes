import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import { useFormState } from "react-dom";
import MovieCard from "./components/MovieCard";
import {useDebounce} from 'react-use'
import { getTrendinMovies, updateSearchCount } from "./appwrite";





const API_BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS ={method:'GET',
  headers:{
    accept:'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
}



const App = () => {
   const [searchTerm,setSearchTerm] = useState('');

   const [errorMessage, setErrorMessage] = useState('');

   const [movieList, setMovieList] = useState([]);

   const [trendingMovies, setTrendingMovies] = useState([]);

   const [isLoading, setIsLoading] = useState(false);

   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

   useDebounce(() => setDebouncedSearchTerm(searchTerm),500,[searchTerm]);

     const loadTrendingMovies = async () =>{
  try{
   const movies = await getTrendinMovies();

   setTrendingMovies(movies);

  }catch(error){
    console.error(`Error F[fetching trending movies: ${error}`)
  }
  }


   const fetchmovies = async (query = '' ) =>{
    setIsLoading(true);
    setErrorMessage('')
  


    try{
       const endpoint = query ?
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
     : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
     
      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
         throw new Error('Failed to fetch movies');
      }

     const data = await response.json();

     if(data.response=== false){
      setErrorMessage(data.Error || 'failed fetch movies');
      setMovieList([]);
      return;
     }

     setMovieList(data.results|| []);
   
   if(query && data.results.length > 0){
    await updateSearchCount(query,data.results[0]);
   }
    }
    
    catch(error){
     console.error(`erro fetching movies:${error}`);
     setErrorMessage('erro fetching movies. please try again later')
    } finally {
      setIsLoading(false)
    }
   }

  useEffect(()=>{
    fetchmovies(debouncedSearchTerm);
  },[debouncedSearchTerm]);

  useEffect(()=>{
    loadTrendingMovies();
  },[]);


  return(
   <main>
    <div className="pattern">

    </div>
    <div className="wrapper">
      <header> 
       <img src="./naruto.png" className="w-100 h-100"/>
        <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the hassle</h1>

       <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      </header>

      
      {trendingMovies.length > 0 && (
        <section className="trending" >
          <h2>Trending Movies</h2>

          <ul>
            {trendingMovies.map((movie,index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />

              </li>
            ))}
          </ul>

        </section>
      )}

      <section className="all-movies" >

      <h2 >All Movies</h2>

      {isLoading ?(
        <p className="text-white">Loading...</p>
      ): errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ):(
        <ul >
          {movieList.map((movie)=>(
          
            <MovieCard  key={movie.id} movie={movie}/>

          ))}
        </ul>
      )}
      </section>
    </div>
   </main>
)}

export default App;