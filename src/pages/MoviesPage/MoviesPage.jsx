import { searchMovies } from '../../api';
import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [findMovies, setFindMovies] = useState(false);
  const [error, setError] = useState(false);

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
        const data = await searchMovies(search);
        setMovies(data);
        setFindMovies(true);
      } catch (error) {
        setError(true);
      } finally {
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
      {error && 'Something wrong. Try again later'}
      {findMovies && search !== '' && <MovieList movies={movies} />}
    </>
  );
}
