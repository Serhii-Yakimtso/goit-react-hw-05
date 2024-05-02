import { Link, NavLink, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <>
      <ul className={css.list}>
        {movies.map(({ id, poster_path, title }) => (
          <li key={id} className={css.item}>
            <NavLink to={`/movies/${id}`} state={location}>
              <div className={css.card}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt={title}
                  width="100"
                />
                <p className={css.title}> {title}</p>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
