import { MovieCompany } from '../../utils/types/models';
import { MovieCompanyContextAction } from '../../utils/types/context';
import moviesApi from '../../api/moviesApi';
import { actionTypes } from './reducer';

export const fetchMovieCompanies = (
  dispatch: React.Dispatch<MovieCompanyContextAction>
) => async (): Promise<void> => {
  await moviesApi.get<MovieCompany[]>('/movieCompanies').then((res) => {
    dispatch({
      type: actionTypes.setMovieCompanies,
      payload: res.data,
    })
  }).
  catch(() => {
    dispatch({
      type: actionTypes.setNotification,
      payload: { visible: true, type: 'error', content: 'There was a problem loading movie companies' },
    })
  });
};

export const closeNotification = (
  dispatch: React.Dispatch<MovieCompanyContextAction>
) => (): void => {
  dispatch({ type: actionTypes.closeNotification });
};
