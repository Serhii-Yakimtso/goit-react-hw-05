// import { MovieList } from '../../components/MovieList/MovieList';
import { getMovies } from '../../api';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Error from '../../Error/Error';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoader(true);
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      {loader && <Loader />}
      {error && <Error />}
      <MovieList movies={movies} />
    </>
  );
}
