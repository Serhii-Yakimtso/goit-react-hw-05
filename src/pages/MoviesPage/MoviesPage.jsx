import { searchMovies } from '../../api';
import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Error from '../../Error/Error';

export default function MoviesPage() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [findMovies, setFindMovies] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const handlesubmit = event => {
    event.preventDefault();
    const nameMovie = event.target.name.value;
    setSearch(nameMovie);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        if (!search) {
          return;
        }
        setLoader(true);
        const data = await searchMovies(search);
        setMovies(data);
        setFindMovies(true);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchMovies();
  }, [search]);

  return (
    <>
      <form onSubmit={handlesubmit}>
        <input type="text" name="name" autoFocus placeholder="Search movie" />

        <button type="submit">Search</button>
      </form>
      {loader && <Loader />}
      {error && <Error />}
      {findMovies && search !== '' && <MovieList movies={movies} />}
    </>
  );
}
