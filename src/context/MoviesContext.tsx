import React, { useReducer } from 'react';

import { Movie } from '../utils/types/models';
import {
  MoviesContextState,
  MoviesContextAction,
  MoviesContextActionTypes,
  MoviesContext,
} from '../utils/types/context';
import moviesApi from '../api/moviesApi';

const INITIAL_STATE: MoviesContextState = {
  movies: [],
  selectedMovie: undefined,
  error: '',
};

const INITIAL_CONTEXT: MoviesContext = {
  state: INITIAL_STATE,
  fetchMovies: () => Promise.resolve(),
  selectMovie: () => null,
}

const ACTION_TYPES: MoviesContextActionTypes = {
  setMovies: 'SET_MOVIES_DATA',
  setError: 'SET_ERROR',
  setSelectedMovie: 'SET_SELECTED_MOVIE',
};

const moviesReducer = (
  state: MoviesContextState,
  action: MoviesContextAction,
): MoviesContextState => {
  switch (action.type) {
    case ACTION_TYPES.setMovies:
      return { ...state, movies: action.payload, error: '' };
    case ACTION_TYPES.setError:
      return { ...state, error: action.payload };
    case ACTION_TYPES.setSelectedMovie:
      return { ...state, selectedMovie: action.payload };
    default:
      return state;
  }
};

const fetchMovies = (
  dispatch: React.Dispatch<MoviesContextAction>
) => async (): Promise<void> => {
  await moviesApi.get<Movie[]>('/movies')
  .then((res) => {
    dispatch({
      type: ACTION_TYPES.setMovies,
      payload: res.data,
    })
  }).
  catch((err) => {
    dispatch({
      type: ACTION_TYPES.setError,
      payload: err.message,
    })
  });
};

const selectMovie = (
  dispatch: React.Dispatch<MoviesContextAction>
) => (movie: Movie | undefined): void => {
  dispatch({
    type: ACTION_TYPES.setSelectedMovie,
    payload: movie,
  })
};

export const Context = React.createContext<MoviesContext>(INITIAL_CONTEXT);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(moviesReducer, INITIAL_STATE);

  const actions = {
    fetchMovies: fetchMovies(dispatch),
    selectMovie: selectMovie(dispatch),
  };

  const value = { state, ...actions };
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};


