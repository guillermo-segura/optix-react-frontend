import {
  MovieCompaniesContextState,
  MovieCompanyContextAction,
  MovieCompanyContextActionTypes,
} from '../../utils/types/context';

export const initialState: MovieCompaniesContextState = {
  movieCompanies: [],
  notification: {
    visible: false,
    type: 'success',
    content: '',
  },
};

export const actionTypes: MovieCompanyContextActionTypes = {
  setMovieCompanies: 'SET_MOVIE_COMPANIES_DATA',
  setNotification: 'SET_NOTIFICATION',
  closeNotification: 'CLOSE_NOTIFICATION',
};

export const movieCompaniesReducer = (
  state: MovieCompaniesContextState,
  action: MovieCompanyContextAction,
): MovieCompaniesContextState => {
  switch (action.type) {
    case actionTypes.setMovieCompanies:
      return { ...state, movieCompanies: action.payload };
    case actionTypes.setNotification:
      return { ...state, notification: action.payload };
    case actionTypes.closeNotification:
      return { ...state, notification: { ...state.notification, visible: false } };
    default:
      return state;
  }
};
