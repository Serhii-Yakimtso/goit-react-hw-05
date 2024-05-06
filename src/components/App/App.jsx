import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../Layout/Layout';
// import HomePage from '../../pages/HomePage/HomePage';
// import MoviesPage from '../../pages/MoviesPage/MoviesPage';
// import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
// import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
// import MovieCast from '../MovieCast/MovieCast';
// import MovieReviews from '../MovieReviews/MovieReviews';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews')
);

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
