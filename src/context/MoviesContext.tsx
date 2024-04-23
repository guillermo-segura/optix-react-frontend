import createDataContext from './createDataContext';
import moviesApi from '../api/moviesApi';

const INITIAL_STATE = {
  movies: [],
  selectedMovie: undefined,
  error: '',
};

const ACTION_TYPES = {
  setMovies: 'SET_MOVIES_DATA',
  setError: 'SET_ERROR',
  setSelectedMovie: 'SET_SELECTED_MOVIE',
};

const moviesReducer = (state, action) => {
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

const fetchMovies = (dispatch) => async () => {
  await moviesApi.get('/movies').then((res) => {
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

const selectMovie = (dispatch) => (movie) => {
  dispatch({
    type: ACTION_TYPES.setSelectedMovie,
    payload: movie,
  })
};

const moviesActions = {
  fetchMovies,
  selectMovie,
};

export const { Provider, Context } = createDataContext(
  moviesReducer,
  moviesActions,
  INITIAL_STATE,
);