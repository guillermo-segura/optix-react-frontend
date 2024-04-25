import { render, screen } from '@testing-library/react';

import { useMovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { useMoviesContext } from '../../context/MoviesContext';
import { NotificationsContainer } from './NotificationsContainer';

jest.mock('../../context/MoviesContext', () => ({
  useMoviesContext: jest.fn(() => ({
    closeNotification: jest.fn(),
    state: {
      notification: {
        visible: false,
        type: 'info',
        content: 'Movies Notification Content'
      }
    }
  }))
}));

jest.mock('../../context/MovieCompaniesContext', () => ({
  useMovieCompaniesContext: jest.fn(() => ({
    closeNotification: jest.fn(),
    state: {
      notification: {
        visible: false,
        type: 'warning',
        content: 'Movie Companies Notification Content'
      }
    }
  }))
}));

describe('NotificationsContainer component', () => {
  it('renders correctly when both movie and movie companies notifications are visible', () => {
    (useMoviesContext as jest.Mock).mockReturnValueOnce({
      closeNotification: jest.fn(),
      state: {
        notification: {
          visible: true,
          type: 'info',
          content: 'Movies Notification Content'
        }
      }
    });

    (useMovieCompaniesContext as jest.Mock).mockReturnValueOnce({
      closeNotification: jest.fn(),
      state: {
        notification: {
          visible: true,
          type: 'warning',
          content: 'Movie Companies Notification Content'
        }
      }
    });

    render(<NotificationsContainer />);

    const moviesNotification = screen.queryByText('Movies Notification Content');
    const movieCompaniesNotification = screen.queryByText('Movie Companies Notification Content');

    expect(moviesNotification).toBeInTheDocument();
    expect(movieCompaniesNotification).toBeInTheDocument();
  });

  it('renders correctly when only movie notifications are visible', () => {
    (useMoviesContext as jest.Mock).mockReturnValueOnce({
      closeNotification: jest.fn(),
      state: {
        notification: {
          visible: true,
          type: 'info',
          content: 'Movies Notification Content'
        }
      }
    });

    render(<NotificationsContainer />);

    const moviesNotification = screen.queryByText('Movies Notification Content');
    const movieCompaniesNotification = screen.queryByText('Movie Companies Notification Content');

    expect(moviesNotification).toBeInTheDocument();
    expect(movieCompaniesNotification).not.toBeInTheDocument();
  });

  it('renders correctly when only movie companies notifications are visible', () => {
    (useMovieCompaniesContext as jest.Mock).mockReturnValueOnce({
      closeNotification: jest.fn(),
      state: {
        notification: {
          visible: true,
          type: 'warning',
          content: 'Movie Companies Notification Content'
        }
      }
    });

    render(<NotificationsContainer />);

    const moviesNotification = screen.queryByText('Movies Notification Content');
    const movieCompaniesNotification = screen.queryByText('Movie Companies Notification Content');

    expect(moviesNotification).not.toBeInTheDocument();
    expect(movieCompaniesNotification).toBeInTheDocument();
  });

  it('renders correctly when neither movie nor movie companies notifications are visible', () => {
    render(<NotificationsContainer />);

    const moviesNotification = screen.queryByText('Movies Notification Content');
    const movieCompaniesNotification = screen.queryByText('Movie Companies Notification Content');

    expect(moviesNotification).not.toBeInTheDocument();
    expect(movieCompaniesNotification).not.toBeInTheDocument();
  });
});