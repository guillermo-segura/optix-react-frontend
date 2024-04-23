import createDataContext from './createDataContext';
import moviesApi from '../api/moviesApi';

const INITIAL_STATE = {
  movieCompanies: [],
  error: '',
};

const ACTION_TYPES = {
  setMovieCompanies: 'SET_MOVIE_COMPANIES_DATA',
  setError: 'SET_ERROR',
};

const movieCompaniesReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.setMovieCompanies:
      return { ...state, movieCompanies: action.payload, error: '' };
    case ACTION_TYPES.setError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const fetchMovieCompanies = (dispatch) => async () => {
  await moviesApi.get('/movieCompanies').then((res) => {
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

const movieCompaniesActions = {
  fetchMovieCompanies,
};

export const { Provider, Context } = createDataContext(
  movieCompaniesReducer,
  movieCompaniesActions,
  INITIAL_STATE,
);