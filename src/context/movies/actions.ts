
import { MoviesContextAction, SubmitReviewPayload } from '../../utils/types/context';
import { Movie } from '../../utils/types/models';
import moviesApi from '../../api/moviesApi';
import { actionTypes } from './reducer';

export const fetchMovies = (
  dispatch: React.Dispatch<MoviesContextAction>
) => async (): Promise<void> => {
  dispatch({
    type: actionTypes.setLoading,
    payload: true,
  });

  await moviesApi.get<Movie[]>('/movies')
  .then((res) => {
    dispatch({
      type: actionTypes.setMovies,
      payload: res.data,
    })
  })
  .catch(() => {
    dispatch({
      type: actionTypes.setNotification,
      payload: { visible: true, type: 'error', content: 'There was a problem fetching movies' },
    })
  })
  .finally(() => {
    dispatch({
      type: actionTypes.setLoading,
      payload: false,
    });
  })
};

export const submitReview = (
  dispatch: React.Dispatch<MoviesContextAction>
) => async (payload: SubmitReviewPayload): Promise<void> => {
  await moviesApi.post('/submitReview', { payload })
    .then((res) => {
      dispatch({
        type: actionTypes.setNotification,
        payload: { visible: true, type: 'success', content: res.data.message },
      })
    }).
    catch((err) => {
      dispatch({
        type: actionTypes.setNotification,
        payload: { visible: true, type: 'error', content: err.message },
      })
    });
};

export const closeNotification = (
  dispatch: React.Dispatch<MoviesContextAction>
) => (): void => {
  dispatch({ type: actionTypes.closeNotification });
};

export const selectMovie = (
  dispatch: React.Dispatch<MoviesContextAction>
) => (movie: Movie | undefined): void => {
  dispatch({
    type: actionTypes.setSelectedMovie,
    payload: movie,
  })
};
