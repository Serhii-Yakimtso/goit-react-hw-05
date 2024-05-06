import { useState, useEffect, useRef, Suspense } from 'react';
import {
  Link,
  useParams,
  Outlet,
  useLocation,
  NavLink,
} from 'react-router-dom';
import { getDataMovie } from '../../api';

import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [dataMovie, setDataMovie] = useState(null);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const backLimkURL = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function fetchDataMovie() {
      try {
        setLoader(true);
        const data = await getDataMovie(movieId);
        setDataMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchDataMovie();
  }, [movieId]);

  const { poster_path, title, popularity, overview, genres } = dataMovie ?? {};

  return (
    <>
      {loader && <Loader />}
      {error && <Error />}
      {dataMovie && (
        <div>
          <NavLink className={css.btn} to={backLimkURL.current}>
            Go back
          </NavLink>
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

          <Suspense fallback={<div>loading</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
}
