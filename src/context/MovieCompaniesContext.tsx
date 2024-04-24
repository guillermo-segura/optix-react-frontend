import React, { useReducer } from 'react';

import { MovieCompany } from '../utils/types/models';
import {
  MovieCompaniesContextState,
  MovieCompanyContextAction,
  MovieCompanyContextActionTypes,
  MovieCompaniesContext,
} from '../utils/types/context';
import moviesApi from '../api/moviesApi';

const INITIAL_STATE: MovieCompaniesContextState = {
  movieCompanies: [],
  notification: {
    visible: false,
    type: 'success',
    content: '',
  },
};

const INITIAL_CONTEXT: MovieCompaniesContext = {
  state: INITIAL_STATE,
  fetchMovieCompanies: () => Promise.resolve(),
  closeNotification: () => null,
}

const ACTION_TYPES: MovieCompanyContextActionTypes = {
  setMovieCompanies: 'SET_MOVIE_COMPANIES_DATA',
  setNotification: 'SET_NOTIFICATION',
  closeNotification: 'CLOSE_NOTIFICATION',
};

const moviesReducer = (
  state: MovieCompaniesContextState,
  action: MovieCompanyContextAction,
): MovieCompaniesContextState => {
  switch (action.type) {
    case ACTION_TYPES.setMovieCompanies:
      return { ...state, movieCompanies: action.payload };
    case ACTION_TYPES.setNotification:
      return { ...state, notification: action.payload };
    case ACTION_TYPES.closeNotification:
      return { ...state, notification: { ...state.notification, visible: false } };
    default:
      return state;
  }
};

const fetchMovieCompanies = (
  dispatch: React.Dispatch<MovieCompanyContextAction>
) => async (): Promise<void> => {
  await moviesApi.get<MovieCompany[]>('/movieCompanies').then((res) => {
    dispatch({
      type: ACTION_TYPES.setMovieCompanies,
      payload: res.data,
    })
  }).
  catch((err) => {
    dispatch({
      type: ACTION_TYPES.setNotification,
      payload: { visible: true, type: 'error', content: 'There was a problem loading movie companies' },
    })
  });
};

const closeNotification = (
  dispatch: React.Dispatch<MovieCompanyContextAction>
) => (): void => {
  dispatch({ type: ACTION_TYPES.closeNotification });
};

export const Context = React.createContext<MovieCompaniesContext>(INITIAL_CONTEXT);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(moviesReducer, INITIAL_STATE);

  const actions = {
    fetchMovieCompanies: fetchMovieCompanies(dispatch),
    closeNotification: closeNotification(dispatch),
  };

  return (
    <Context.Provider value={{ state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
