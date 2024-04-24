import { useEffect, useContext } from 'react';

import { Context as MoviesContext } from '../../context/MoviesContext';
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';

export const useMoviesData = () => {
  const { fetchMovies, closeNotification: closeMoviesNotification, state: { notification: moviesNotification, selectedMovie } } = useContext(MoviesContext);
  const { fetchMovieCompanies, closeNotification: closeMovieCompaniesNotification, state: { notification: movieCompaniesNotification} } = useContext(MovieCompaniesContext);

  useEffect(() => {
    fetchMovieCompanies();
    fetchMovies();
  }, []);

  return {
    moviesNotification,
    movieCompaniesNotification,
    selectedMovie,
    closeMoviesNotification,
    closeMovieCompaniesNotification,
  };
}