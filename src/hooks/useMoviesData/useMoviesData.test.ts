import { renderHook } from '@testing-library/react';

import { useMovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { useMoviesContext } from '../../context/movies/MoviesContext';
import { useMoviesData } from './useMoviesData';

jest.mock('../../context/movies/MoviesContext', () => ({
  useMoviesContext: jest.fn(),
}));

jest.mock('../../context/MovieCompaniesContext', () => ({
  useMovieCompaniesContext: jest.fn(),
}));

describe('useMoviesData hook', () => {
  it('returns correct values when data is available', () => {
    const movies = [{ id: 1, title: 'Movie 1', filmCompanyId: 1 }];
    const movieCompanies = [{ id: 1, name: 'Company 1' }];

    (useMoviesContext as jest.Mock).mockReturnValue({
      fetchMovies: jest.fn(),
      state: { selectedMovie: undefined, loading: false, movies },
    });

    (useMovieCompaniesContext as jest.Mock).mockReturnValue({
      fetchMovieCompanies: jest.fn(),
      state: { movieCompanies },
    });

    const { result } = renderHook(() => useMoviesData());

    expect(result.current.selectedMovie).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.movies).toEqual([{ id: 1, title: 'Movie 1', filmCompanyId: 1, companyName: 'Company 1' }]);
  });

  it('calls fetchMovies and fetchMovieCompanies on mount', () => {
    const fetchMovies = jest.fn();
    const fetchMovieCompanies = jest.fn();

    (useMoviesContext as jest.Mock).mockReturnValue({
      fetchMovies,
      state: { selectedMovie: undefined, loading: false, movies: [] },
    });

    (useMovieCompaniesContext as jest.Mock).mockReturnValue({
      fetchMovieCompanies,
      state: { movieCompanies: [] },
    });

    renderHook(() => useMoviesData());

    expect(fetchMovies).toHaveBeenCalledTimes(1);
    expect(fetchMovieCompanies).toHaveBeenCalledTimes(1);
  });

  it('attaches companyName to movies', () => {
    const movies = [{ id: 1, title: 'Movie 1', filmCompanyId: 1 }];
    const movieCompany = { id: 1, name: 'ACME' };

    (useMoviesContext as jest.Mock).mockReturnValue({
      fetchMovies: jest.fn(),
      state: { selectedMovie: undefined, loading: false, movies },
    });

    (useMovieCompaniesContext as jest.Mock).mockReturnValue({
      fetchMovieCompanies: jest.fn(),
      state: { movieCompanies: [movieCompany] },
    });

    const { result } = renderHook(() => useMoviesData());

    expect(result.current.movies).toEqual([{
      id: 1,
      title: 'Movie 1',
      filmCompanyId: 1,
      companyName: movieCompany.name,
    }]);
  });

  it('leaves companyName empty when no company matches', () => {
    const movies = [{ id: 1, title: 'Movie 1', filmCompanyId: 1 }];
    const movieCompany = { id: 2, name: 'ACME' };

    (useMoviesContext as jest.Mock).mockReturnValue({
      fetchMovies: jest.fn(),
      state: { selectedMovie: undefined, loading: false, movies },
    });

    (useMovieCompaniesContext as jest.Mock).mockReturnValue({
      fetchMovieCompanies: jest.fn(),
      state: { movieCompanies: [movieCompany] },
    });

    const { result } = renderHook(() => useMoviesData());

    expect(result.current.movies).toEqual([{
      id: 1,
      title: 'Movie 1',
      filmCompanyId: 1,
      companyName: '',
    }]);
  });

  it('leaves companyName empty when movieCompanies is empty', () => {
    const movies = [{ id: 1, title: 'Movie 1', filmCompanyId: 1 }];

    (useMoviesContext as jest.Mock).mockReturnValue({
      fetchMovies: jest.fn(),
      state: { selectedMovie: undefined, loading: false, movies },
    });

    (useMovieCompaniesContext as jest.Mock).mockReturnValue({
      fetchMovieCompanies: jest.fn(),
      state: { movieCompanies: [] },
    });

    const { result } = renderHook(() => useMoviesData());

    expect(result.current.movies).toEqual([{
      id: 1,
      title: 'Movie 1',
      filmCompanyId: 1,
      companyName: '',
    }]);
  });
});
