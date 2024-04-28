import { Link, NavLink, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <>
      <ul className={css.list}>
        {movies.map(movie => (
          <li key={movie.id} className={css.item}>
            <NavLink to={`/movies/${movie.id}`} state={location}>
              <div className={css.card}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                  width="100"
                />
                <p className={css.title}> {movie.title}</p>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
