import {
  MoviesContextState,
  MoviesContextAction,
  MoviesContextActionTypes,
} from '../../utils/types/context';

export const initialState: MoviesContextState = {
  loading: false,
  movies: [],
  selectedMovie: undefined,
  notification: {
    visible: false,
    type: 'success',
    content: '',
  },
};

export const actionTypes: MoviesContextActionTypes = {
  setMovies: 'SET_MOVIES_DATA',
  setNotification: 'SET_NOTIFICATION',
  closeNotification: 'CLOSE_NOTIFICATION',
  setSelectedMovie: 'SET_SELECTED_MOVIE',
  setLoading: 'SET_LOADING',
};

export const moviesReducer = (
  state: MoviesContextState,
  action: MoviesContextAction,
): MoviesContextState => {
  switch (action.type) {
    case actionTypes.setMovies:
      return { ...state, movies: action.payload };
    case actionTypes.setNotification:
      return { ...state, notification: action.payload };
    case actionTypes.closeNotification:
      return { ...state, notification: { ...state.notification, visible: false } };
    case actionTypes.setSelectedMovie:
      return { ...state, selectedMovie: action.payload };
    case actionTypes.setLoading:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
