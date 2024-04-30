import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchDataMovie } from '../../api';

import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [dataMovie, setDataMovie] = useState({});
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchDataMovie() {
      try {
        const data = await searchDataMovie(movieId);
        setDataMovie(data.data);
        console.log(dataMovie);
      } catch (error) {
        setError(true);
      } finally {
      }
    }
    fetchDataMovie();
  }, []);

  const { poster_path, title, popularity, overview, genres } = dataMovie;

  return (
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
            {/* {genres.map(ganre => (
              <li key={ganre.id}>{ganre.name}</li>
            ))} */}
          </ul>
        </div>
      </div>
      <h2>Additional information</h2>
      <ul>
        <li>
          <Link>Cast</Link>
        </li>
        <li>
          <Link>Reviews</Link>
        </li>
      </ul>
    </div>
  );
}
