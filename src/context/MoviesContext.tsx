import React, { useReducer } from 'react';

import { Movie } from '../utils/types/models';
import {
  MoviesContextState,
  MoviesContextAction,
  MoviesContextActionTypes,
  MoviesContext,
  SubmitReviewPayload,
} from '../utils/types/context';
import moviesApi from '../api/moviesApi';

const INITIAL_STATE: MoviesContextState = {
  loading: false,
  movies: [],
  selectedMovie: undefined,
  notification: {
    visible: false,
    type: 'success',
    content: '',
  },
};

const INITIAL_CONTEXT: MoviesContext = {
  state: INITIAL_STATE,
  fetchMovies: () => Promise.resolve(),
  submitReview: () => Promise.resolve(),
  closeNotification: () => null,
  selectMovie: () => null,
}

const ACTION_TYPES: MoviesContextActionTypes = {
  setMovies: 'SET_MOVIES_DATA',
  setNotification: 'SET_NOTIFICATION',
  closeNotification: 'CLOSE_NOTIFICATION',
  setSelectedMovie: 'SET_SELECTED_MOVIE',
  setLoading: 'SET_LOADING',
};

const moviesReducer = (
  state: MoviesContextState,
  action: MoviesContextAction,
): MoviesContextState => {
  switch (action.type) {
    case ACTION_TYPES.setMovies:
      return { ...state, movies: action.payload };
    case ACTION_TYPES.setNotification:
      return { ...state, notification: action.payload };
    case ACTION_TYPES.closeNotification:
      return { ...state, notification: { ...state.notification, visible: false } };
    case ACTION_TYPES.setSelectedMovie:
      return { ...state, selectedMovie: action.payload };
    case ACTION_TYPES.setLoading:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const fetchMovies = (
  dispatch: React.Dispatch<MoviesContextAction>
) => async (): Promise<void> => {
  dispatch({
    type: ACTION_TYPES.setLoading,
    payload: true,
  });

  await moviesApi.get<Movie[]>('/movies')
  .then((res) => {
    dispatch({
      type: ACTION_TYPES.setMovies,
      payload: res.data,
    })
  })
  .catch(() => {
    dispatch({
      type: ACTION_TYPES.setNotification,
      payload: { visible: true, type: 'error', content: 'There was a problem fetching movies' },
    })
  })
  .finally(() => {
    dispatch({
      type: ACTION_TYPES.setLoading,
      payload: false,
    });
  })
};

const submitReview = (
  dispatch: React.Dispatch<MoviesContextAction>
) => async (payload: SubmitReviewPayload): Promise<void> => {
  await moviesApi.post('/submitReview', { payload })
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.setNotification,
        payload: { visible: true, type: 'success', content: res.data.message },
      })
    }).
    catch((err) => {
      dispatch({
        type: ACTION_TYPES.setNotification,
        payload: { visible: true, type: 'error', content: err.message },
      })
    });
};

const closeNotification = (
  dispatch: React.Dispatch<MoviesContextAction>
) => (): void => {
  dispatch({ type: ACTION_TYPES.closeNotification });
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

export const Provider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(moviesReducer, INITIAL_STATE);

  const actions = {
    fetchMovies: fetchMovies(dispatch),
    submitReview: submitReview(dispatch),
    selectMovie: selectMovie(dispatch),
    closeNotification: closeNotification(dispatch),
  };

  return (
    <Context.Provider value={{ state, ...actions }}>
      {children}
    </Context.Provider>
  );
};


