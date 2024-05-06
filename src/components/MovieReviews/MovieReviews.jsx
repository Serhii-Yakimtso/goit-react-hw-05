import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsMovie } from '../../api';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const [dataMovieReviews, getDataMovieReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchDataMovieReviews() {
      try {
        setLoader(true);
        const data = await getReviewsMovie(movieId);
        getDataMovieReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchDataMovieReviews();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}
      {error && <Error />}
      {dataMovieReviews.length === 0 && (
        <p>Sorry. No reviews for this movie.</p>
      )}
      {dataMovieReviews && (
        <ul>
          {dataMovieReviews.map(
            ({
              id,
              author,
              author_details: { avatar_path, rating, username },
              content,
              created_at,
            }) => (
              <li className={css.item} key={id}>
                <div className={css.wrapper}>
                  <img
                    className={css.img}
                    src={`https://image.tmdb.org/t/p/w500/${avatar_path}`}
                    alt={username}
                    width="100"
                  />
                  <div>
                    <p>
                      <b>Author: {author}</b>
                    </p>
                    <p>Author's rating: {rating}</p>
                    <p>Review created: {Date(created_at)}</p>
                  </div>
                </div>
                <p>{content}</p>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}
