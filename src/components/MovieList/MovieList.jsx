import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  return (
    <>
      <ul className={css.list}>
        {movies.map(movie => (
          <li key={movie.id} className={css.item}>
            <img
              src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
              alt=""
              width="30"
            />
            <p> {movie.title}</p>{' '}
          </li>
        ))}
      </ul>
    </>
  );
}
