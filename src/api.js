import axios from 'axios';

// const API_KEY = 'fb53631008a69a9fffef9c3858eef479';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const authorization =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjUzNjMxMDA4YTY5YTlmZmZlZjljMzg1OGVlZjQ3OSIsInN1YiI6IjY2MmUyNmQ3ZjZmZDE4MDEyYjIyYzgyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WK-bOd2Lxjh_fJnvVmGNuDDB1CA1wI08YAQQD2d1NHg';

export const getMovies = async () => {
  const response = await axios.get('trending/movie/day', {
    headers: {
      Authorization: authorization,
    },
    params: { language: 'en-US' },
  });

  return response.data.results;
};

export const searchMovies = async query => {
  const response = await axios.get('search/movie', {
    headers: {
      Authorization: authorization,
    },
    params: {
      query: query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  console.log(response);
  console.log(response.data);
  console.log(response.data.results);
  return response.data.results;
};

export const getDataMovie = async id => {
  const response = await axios.get(`/movie/${id}`, {
    headers: {
      Authorization: authorization,
    },
    params: {
      language: 'en-US',
    },
  });

  return response.data;
  // return (await response).data.results;
};

export const getCastMovie = async id => {
  const response = await axios.get(`/movie/${id}/credits`, {
    headers: {
      Authorization: authorization,
    },
    params: {
      language: 'en-US',
    },
  });

  return response.data.cast;
  // return (await response).data.results;
};

export const getReviewsMovie = async id => {
  const response = await axios.get(`movie/${id}/reviews`, {
    headers: {
      Authorization: authorization,
    },
    params: {
      language: 'en-US',
    },
  });
  return response.data.results;
};
