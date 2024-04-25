import { render, screen } from '@testing-library/react';
import { App } from './App';

jest.mock('../notificationsContainer/NotificationsContainer', () => ({
  __esModule: true,
  NotificationsContainer: jest.fn(() => <div data-testid="notifications-container">Mocked Notifications Container</div>)
}));

jest.mock('../movies/Movies', () => ({
  __esModule: true,
  Movies: jest.fn(() => <div data-testid="movies">Mocked Movies Component</div>)
}));

jest.mock('../../context/movies/MoviesContext', () => ({
  MoviesProvider: ({ children }: { children: JSX.Element }) => children,
}));

jest.mock('../../context/movieCompanies/MovieCompaniesContext', () => ({
  MovieCompaniesProvider: ({ children }: { children: JSX.Element }) => children,
}));

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('displays the welcome message', () => {
    render(<App />);
    const welcomeMessage = screen.getByText('Welcome to MovieDB!');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders Movies component with correct props', () => {
    render(<App />);
    const moviesComponent = screen.getByTestId('movies');
    expect(moviesComponent).toBeInTheDocument();
  });

  it('renders NotificationsContainer component with correct props', () => {
    render(<App />);
    const moviesComponent = screen.getByTestId('notifications-container');
    expect(moviesComponent).toBeInTheDocument();
  });
});

