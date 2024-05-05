import { searchMovies } from '../../api';
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Error from '../../Error/Error';

export default function MoviesPage() {
  // const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  // const [findMovies, setFindMovies] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  // const location = useLocation();
  // console.log(location);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = searchParams.get('query') ?? '';

  // const changeFilterParams = newFilter => {
  //   searchParams.set('query', newFilter);
  //   setSearchParams({
  //     query: searchParams,
  //   });
  //   console.log(searchParams);
  // };

  const handlesubmit = event => {
    event.preventDefault();
    const nameMovie = event.target.name.value;
    // setSearch(nameMovie);
    setSearchParams({ query: nameMovie });
    // changeFilterParams(nameMovie);
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
        // setFindMovies(true);
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
