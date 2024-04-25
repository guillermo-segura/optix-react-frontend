import { useEffect, useMemo } from 'react';

import { useMoviesContext } from '../../context/movies/MoviesContext';
import { useMovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { Movie } from '../../utils/types/models';

export interface UseMoviesData {
  selectedMovie: Movie | undefined;
  loading: boolean;
  movies: Movie[];
}

export const useMoviesData = (): UseMoviesData => {
  const { fetchMovies, state: { selectedMovie, loading, movies } } = useMoviesContext();
  const { fetchMovieCompanies, state: { movieCompanies } } = useMovieCompaniesContext();

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