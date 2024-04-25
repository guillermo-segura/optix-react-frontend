import { MoviesContextState } from '../../utils/types/context';
import { moviesReducer, actionTypes, initialState } from './reducer';

describe('moviesReducer', () => {
  it('should set movies', () => {
    const action = { type: actionTypes.setMovies, payload: [{ id: 1, title: 'Movie 1' }] };
    const newState = moviesReducer(initialState, action);
    expect(newState.movies).toEqual([{ id: 1, title: 'Movie 1' }]);
  });

  it('should set notification', () => {
    const action = { type: actionTypes.setNotification, payload: { visible: true, type: 'error', content: 'Error message' } };
    const newState = moviesReducer(initialState, action);
    expect(newState.notification).toEqual({ visible: true, type: 'error', content: 'Error message' });
  });

  it('should close notification', () => {
    const currentState: MoviesContextState = {
      ...initialState,
      notification: { visible: true, type: 'success', content: 'Success message' },
    };
    const action = { type: actionTypes.closeNotification };
    const newState = moviesReducer(currentState, action);
    expect(newState.notification.visible).toEqual(false);
  });

  it('should set selected movie', () => {
    const action = { type: actionTypes.setSelectedMovie, payload: { id: 1, title: 'Selected Movie' } };
    const newState = moviesReducer(initialState, action);
    expect(newState.selectedMovie).toEqual({ id: 1, title: 'Selected Movie' });
  });

  it('should set loading', () => {
    const action = { type: actionTypes.setLoading, payload: true };
    const newState = moviesReducer(initialState, action);
    expect(newState.loading).toEqual(true);
  });
});
