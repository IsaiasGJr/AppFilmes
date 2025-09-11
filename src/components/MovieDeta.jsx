import React from "react";
import { Link} from "react-router-dom";

const MovieDeta = ({ movie}) => {
  if (!movie) return <p>Carregando...</p>; 


  return (
    <div className="movie-deta">
      <Link to='/'>
      <h2>Home</h2>
      </Link>
      <h1>{movie.title}</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="poster"
        />
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
          className="backdrop"
        />
      </div>

      
      <div className="info">
        
        <div className="genres">
         <p className="info-label">Generes:</p> {movie.genres.map((g) => (
            <span key={g.id} className="genre-badge"> 
              {g.name}
            </span>
          ))}
        </div>

        
        <p className="overview">
          <span className="info-label">Overview:</span>{movie.overview}
        </p>

        
        <p>
          <span className="info-label">Release Date:</span> {movie.release_date}
        </p>
        <p>
          <span className="info-label">Status:</span> {movie.status}
        </p>
        <p>
          <span className="info-label">Vote average:</span> {movie.vote_average}
        </p>
        <p>
          <span className="info-label">Vote count:</span> {movie.vote_count}
        </p>
      </div>
    </div>
  );
};

export default MovieDeta;