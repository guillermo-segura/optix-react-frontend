import { useContext, useReducer, createContext } from 'react';

import { MovieCompaniesContext } from '../../utils/types/context';
import { movieCompaniesReducer, initialState } from './reducer';
import { fetchMovieCompanies, closeNotification } from './actions';

const Context = createContext<MovieCompaniesContext>({
  state: initialState,
  fetchMovieCompanies: () => Promise.resolve(),
  closeNotification: () => null,
});

export const MovieCompaniesProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(movieCompaniesReducer, initialState);

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

export const useMovieCompaniesContext = () => useContext(Context);
