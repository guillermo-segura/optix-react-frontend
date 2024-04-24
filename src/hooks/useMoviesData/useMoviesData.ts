import { useEffect, useContext } from 'react';

import { Context as MoviesContext } from '../../context/MoviesContext';
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';

export const useMoviesData = () => {
  const { fetchMovies, state: { selectedMovie } } = useContext(MoviesContext);
  const { fetchMovieCompanies } = useContext(MovieCompaniesContext);

  useEffect(() => {
    fetchMovieCompanies();
    fetchMovies();
  }, []);

  return {
    selectedMovie,
  };
}