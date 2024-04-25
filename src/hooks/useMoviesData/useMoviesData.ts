import { useEffect, useContext, useMemo } from 'react';

import { Context as MoviesContext } from '../../context/MoviesContext';
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { Movie } from '../../utils/types/models';

export interface UseMoviesData {
  selectedMovie: Movie | undefined;
  loading: boolean;
  movies: Movie[];
}

export const useMoviesData = (): UseMoviesData => {
  const { fetchMovies, state: { selectedMovie, loading, movies } } = useContext(MoviesContext);
  const { fetchMovieCompanies, state: { movieCompanies } } = useContext(MovieCompaniesContext);

  useEffect(() => {
    fetchMovieCompanies();
    fetchMovies();
  }, []);

  const moviesWithCompanyName = useMemo(() => movies.map((movie) => {
    const company = movieCompanies.find((company) => company.id === movie.filmCompanyId);
    return {
      ...movie,
      companyName: company ? company.name : '',
    };
  }), [JSON.stringify(movies), JSON.stringify(movieCompanies)]);

  return {
    selectedMovie,
    loading,
    movies: moviesWithCompanyName,
  };
}