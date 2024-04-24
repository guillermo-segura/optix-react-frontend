import { Movie, MovieCompany } from './models';

// MoviesContext

export interface SubmitReviewPayload {
  message: string;
  review: number;
}

export interface MoviesContext {
  state: MoviesContextState;
  fetchMovies: () => Promise<void>;
  submitReview: (payload: SubmitReviewPayload) => Promise<void>;
  selectMovie: (movie: Movie | undefined) => void;
  closeNotification: () => void;
}

interface Notification {
  visible: boolean;
  type: 'success' | 'error';
  content: string;
}

export interface MoviesContextState {
  movies: Movie[],
  selectedMovie: Movie | undefined,
  notification: Notification,
  loading: boolean,
}

export type MoviesContextType = 'SET_MOVIES_DATA' | 'SET_NOTIFICATION' | 'SET_SELECTED_MOVIE' | 'CLOSE_NOTIFICATION' | 'SET_LOADING';

export interface MoviesContextAction {
  type: MoviesContextType;
  payload?: any;
}

export interface MoviesContextActionTypes {
  [key: string]: MoviesContextType;
}

// MovieCompaniesContext

export interface MovieCompaniesContext {
  state: MovieCompaniesContextState;
  fetchMovieCompanies: () => Promise<void>;
  closeNotification: () => void;
}

export interface MovieCompaniesContextState {
  movieCompanies: MovieCompany[],
  notification: Notification,
}

export type MovieCompaniesContextType = 'SET_MOVIE_COMPANIES_DATA' | 'SET_NOTIFICATION' | 'CLOSE_NOTIFICATION';

export interface MovieCompanyContextAction {
  type: MovieCompaniesContextType;
  payload?: any;
}

export interface MovieCompanyContextActionTypes {
  [key: string]: MovieCompaniesContextType;
}
