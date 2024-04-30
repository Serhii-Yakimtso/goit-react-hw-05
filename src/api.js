import axios from 'axios';

// const API_KEY = 'fb53631008a69a9fffef9c3858eef479';
// const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
// const urlSearch =
//   'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const authorization =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjUzNjMxMDA4YTY5YTlmZmZlZjljMzg1OGVlZjQ3OSIsInN1YiI6IjY2MmUyNmQ3ZjZmZDE4MDEyYjIyYzgyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WK-bOd2Lxjh_fJnvVmGNuDDB1CA1wI08YAQQD2d1NHg';

export const getMovies = async () => {
  // const response = axios.get(url, options);
  const response = axios.get('trending/movie/day', {
    headers: {
      Authorization: authorization,
    },
    params: { language: 'en-US' },
  });

  return (await response).data.results;
};

export const searchMovies = async query => {
  const response = axios.get('search/movie', {
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

  return (await response).data.results;
};

export const searchDataMovie = id => {
  const response = axios.get(`/movie/${id}`, {
    headers: {
      Authorization: authorization,
    },
    params: {
      // append_to_response: parametr,
      language: 'en-US',
    },
  });

  return response;
  // return (await response).data.results;
};

export const searchCastMovie = id => {
  const response = axios.get(`/movie/${id}/credits`, {
    headers: {
      Authorization: authorization,
    },
    params: {
      // append_to_response: parametr,
      language: 'en-US',
    },
  });

  return response;
  // return (await response).data.results;
};
