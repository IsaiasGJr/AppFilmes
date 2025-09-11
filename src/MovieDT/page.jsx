import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDeta from "../components/MovieDeta.jsx";

const MovieDT = () =>{
    const{id} = useParams();
    const[movie,setMovie]= useState();
    

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=fcd06f46b11e165ce33e8721b3ad6e90`);
        if (!response.ok){ 
            throw new Error("Erro ao buscar o filme")
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      } 
    };

    fetchMovie();
  }, [id]);
    return(
        <div>
            <MovieDeta movie={movie}/>
        </div>
    )


}
export default MovieDT;
