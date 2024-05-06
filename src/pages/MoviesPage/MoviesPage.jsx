import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = searchParams.get('query') ?? '';

  const handlesubmit = event => {
    event.preventDefault();
    const nameMovie = event.target.name.value;
    setSearchParams({ query: nameMovie });
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        if (!queryParams) {
          return;
        }
        setLoader(true);
        const data = await searchMovies(queryParams);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchMovies();
  }, [queryParams]);

  return (
    <>
      <form onSubmit={handlesubmit}>
        <input type="text" name="name" autoFocus placeholder="Search movie" />

        <button type="submit">Search</button>
      </form>
      {loader && <Loader />}
      {error && <Error />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
