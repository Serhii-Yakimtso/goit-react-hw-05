import { useState, useEffect } from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';
import { getDataMovie } from '../../api';
import Loader from '../../components/Loader/Loader';
import Error from '../../Error/Error';

import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  // const [dataMovie, setDataMovie] = useState(null);
  const [dataMovie, setDataMovie] = useState({});
  const [findMovies, setFindMovies] = useState(false);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchDataMovie() {
      try {
        setLoader(true);
        const data = await getDataMovie(movieId);
        setDataMovie(data.data);
        setFindMovies(true);
        // console.log(data);
        // console.log(data.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchDataMovie();
  }, [movieId]);

  const { poster_path, title, popularity, overview, genres } = dataMovie;
  // useEffect(() => {
  //   console.log('poster_path', poster_path);
  //   console.log('title', title);
  //   console.log('popularity', popularity);
  //   console.log('overview', overview);
  //   console.log('genres', genres);
  // }, [dataMovie]);

  return (
    <>
      {loader && <Loader />}
      {error && <Error />}
      {/* {dataMovie && (
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
              width="200"
              className={css.img}
            />
            <div>
              <h2>{title}</h2>
              <p>User Score: {popularity}%</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              <ul>
                {genres.map(ganre => (
                  <li key={ganre.id}>{ganre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <h2>Additional information</h2>
          <ul>
            <li>
              <Link to="">Cast</Link>
            </li>
            <li>
              <Link>Reviews</Link>
            </li>
          </ul>
        </div>
      )} */}
      {findMovies && (
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
              width="200"
              className={css.img}
            />
            <div>
              <h2>{title}</h2>
              <p>User Score: {popularity}%</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              <ul className={css.genre}>
                {genres.map(ganre => (
                  <li key={ganre.id}>{ganre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <h2>Additional information</h2>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>

          <Outlet />
        </div>
      )}
    </>
  );
}
