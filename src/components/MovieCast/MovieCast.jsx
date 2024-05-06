import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastMovie } from '../../api';

import Loader from '../Loader/Loader';
import Error from '../../Error/Error';

import css from './MovieCast.module.css';

export default function MovieCast() {
  const [dataMovieCast, setDataMovieCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchDataMovieCast() {
      try {
        setLoader(true);
        const data = await getCastMovie(movieId);
        setDataMovieCast(data.data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchDataMovieCast();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}
      {error && <Error />}
      {dataMovieCast && (
        <ul className={css.list}>
          {dataMovieCast.map(
            ({ id, original_name, popularity, profile_path, character }) => (
              <li className={css.item} key={id}>
                <img
                  className={css.img}
                  src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                  alt={original_name}
                  width="100"
                />
                <ul className={css.sublist}>
                  <li>
                    <b>Name</b>: {original_name}
                  </li>
                  <li>
                    <b>Character</b>: {character}
                  </li>
                  <li>
                    <b>Popularity</b>: {popularity}%
                  </li>
                </ul>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}
