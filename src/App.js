import React, { useCallback, useEffect, useState } from "react";
import AddMovie from './components/AddMovie'
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {

const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback( async () => {
    setIsLoading(true)
    try{
    const response = await fetch("https://react-292a0-default-rtdb.firebaseio.com/movies.json")

    if(!response.ok){
      throw new Error('Something went wrong!')
    }

    const data = await response.json();

    const loadedMovies = [];

    for(const key in data){
      loadedMovies.push({
        id: key,
        title: data[key].title,
        releaseDate: data[key].releaseDate,
        openingText: data[key].openingText
      })
    }

  
        /*const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          }
        })*/
        setMovies(loadedMovies)
        setIsLoading(false)
      }
      catch (error) {
        setError(error.message)
      }
  }, []);

  const addMovieHandler = (movie) => {
    fetch('https://react-292a0-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie)
    })
  }

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
        {isLoading && !error && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
