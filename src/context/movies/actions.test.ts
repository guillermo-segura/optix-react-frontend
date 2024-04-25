import { fetchMovies, submitReview, closeNotification, selectMovie } from './actions';
import moviesApi from '../../api/moviesApi';
import { actionTypes } from './reducer';

jest.mock('../../api/moviesApi', () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('movieActions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchMovies', () => {
    it('should dispatch actions to fetch movies successfully', async () => {
      const dispatch = jest.fn();
      const movies = [{ id: 1, title: 'Movie 1' }];
      (moviesApi.get as jest.Mock).mockResolvedValueOnce({ data: movies });

      await fetchMovies(dispatch)();

      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.setLoading, payload: true });
      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.setMovies, payload: movies });
      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.setLoading, payload: false });
    });

    it('should dispatch actions when there is an error fetching movies', async () => {
      const dispatch = jest.fn();
      (moviesApi.get as jest.Mock).mockRejectedValueOnce(new Error('500 Error'));

      await fetchMovies(dispatch)();

      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.setLoading, payload: true });
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.setNotification,
        payload: { visible: true, type: 'error', content: 'There was a problem fetching movies' },
      });
      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.setLoading, payload: false });
    });
  });

  describe('submitReview', () => {
    it('should dispatch actions to submit review successfully', async () => {
      const dispatch = jest.fn();
      const payload = { review: 7, message: 'Not bad' };
      (moviesApi.post as jest.Mock).mockResolvedValueOnce({ data: { message: 'All good!' } });

      await submitReview(dispatch)(payload);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.setNotification, payload: { visible: true, type: 'success', content: 'All good!' } });
    });

    it('should trigger notification when submit is unsuccessful', async () => {
      const dispatch = jest.fn();
      (moviesApi.post as jest.Mock).mockRejectedValueOnce(new Error('500 Error'));
      const payload = { review: 7, message: 'Not bad' };

      await submitReview(dispatch)(payload);

      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.setNotification, payload: { visible: true, type: 'error', content: '500 Error' } });
    });
  });

  describe('selectMovie', () => {
    it('should dispatch actions to set selected movie', () => {
      const dispatch = jest.fn();
      const movie = { id: '1', title: 'Movie 1', reviews: [1, 2, 3], filmCompanyId: '3', cost: 777, releaseYear: 2003 };

      selectMovie(dispatch)(movie);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.setSelectedMovie, payload: movie });
    });
  });

  describe('closeNotification', () => {
    it('should dispatch actions to close notification', () => {
      const dispatch = jest.fn();

      closeNotification(dispatch)();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.closeNotification});
    });
  });
});
