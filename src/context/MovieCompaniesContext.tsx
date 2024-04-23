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
  error: '',
};

const INITIAL_CONTEXT: MovieCompaniesContext = {
  state: INITIAL_STATE,
  fetchMovieCompanies: () => Promise.resolve(),
}

const ACTION_TYPES: MovieCompanyContextActionTypes = {
  setMovieCompanies: 'SET_MOVIE_COMPANIES_DATA',
  setError: 'SET_ERROR',
};

const moviesReducer = (
  state: MovieCompaniesContextState,
  action: MovieCompanyContextAction,
): MovieCompaniesContextState => {
  switch (action.type) {
    case ACTION_TYPES.setMovieCompanies:
      return { ...state, movieCompanies: action.payload, error: '' };
    case ACTION_TYPES.setError:
      return { ...state, error: action.payload };
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
      type: ACTION_TYPES.setError,
      payload: err.message,
    })
  });
};

export const Context = React.createContext<MovieCompaniesContext>(INITIAL_CONTEXT);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(moviesReducer, INITIAL_STATE);

  const actions = {
    fetchMovieCompanies: fetchMovieCompanies(dispatch),
  };

  return (
    <Context.Provider value={{ state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
