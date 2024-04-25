import { useContext, useReducer, createContext } from 'react';

import { MoviesContext } from '../../utils/types/context';
import { moviesReducer, initialState } from './reducer';
import {
  fetchMovies,
  submitReview,
  selectMovie,
  closeNotification,
} from './actions';

const Context = createContext<MoviesContext>({
  state: initialState,
  fetchMovies: () => Promise.resolve(),
  submitReview: () => Promise.resolve(),
  closeNotification: () => null,
  selectMovie: () => null,
});

export const MoviesProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

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

export const useMoviesContext = () => useContext(Context);

