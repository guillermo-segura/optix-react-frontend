import { Movie, MovieCompany } from './models';

// MoviesContext

export interface MoviesContext {
  state: MoviesContextState;
  fetchMovies: () => Promise<void>;
  selectMovie: (movie: Movie | undefined) => void;
}

export interface MoviesContextState {
  movies: Movie[],
  selectedMovie: Movie | undefined,
  error: string,
}

export type MoviesContextType = 'SET_MOVIES_DATA' | 'SET_ERROR' | 'SET_SELECTED_MOVIE';

export interface MoviesContextAction {
  type: MoviesContextType;
  payload: any;
}

export interface MoviesContextActionTypes {
  [key: string]: MoviesContextType;
}

// MovieCompaniesContext

export interface MovieCompaniesContext {
  state: MovieCompaniesContextState;
  fetchMovieCompanies: () => Promise<void>;
}

export interface MovieCompaniesContextState {
  movieCompanies: MovieCompany[],
  error: string,
}

export type MovieCompaniesContextType = 'SET_MOVIE_COMPANIES_DATA' | 'SET_ERROR';

export interface MovieCompanyContextAction {
  type: MovieCompaniesContextType;
  payload: any;
}

export interface MovieCompanyContextActionTypes {
  [key: string]: MovieCompaniesContextType;
}
