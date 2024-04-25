import { render, screen } from '@testing-library/react';

import { useMoviesData } from '../../hooks/useMoviesData/useMoviesData';
import { MoviesTable } from '../moviesTable/MoviesTable';
import { ReviewForm } from '../reviewForm/ReviewForm';
import { Movies } from './Movies';

jest.mock('../refreshMoviesButton/RefreshMoviesButton', () => ({
  __esModule: true,
  RefreshMoviesButton: jest.fn(() => <div data-testid="mocked-refresh-movies-button">Mocked Refresh Movies Button</div>)
}));

jest.mock('../moviesTable/MoviesTable', () => ({
  __esModule: true,
  MoviesTable: jest.fn(() => <div data-testid="mocked-movies-table">Mocked Movies Table</div>)
}));

jest.mock('../reviewForm/ReviewForm', () => ({
  __esModule: true,
  ReviewForm: jest.fn(() => <div data-testid="mocked-review-form">Mocked Review Form</div>)
}));

jest.mock('../../hooks/useMoviesData/useMoviesData', () => ({
  __esModule: true,
  useMoviesData: jest.fn(() => ({
    selectedMovie: { id: 1, title: 'Mocked Movie' },
    loading: false,
    movies: [{ id: 1, title: 'Mocked Movie' }],
  }))
}));

describe('Movies component', () => {
  it('renders without crashing', () => {
    render(<Movies />);
  });

  it('displays the right header when movies are loading', () => {
    (useMoviesData as jest.Mock).mockReturnValue({
      selectedMovie: null,
      loading: true,
      movies: [],
    });

    render(<Movies />);

    const moviesHeader = screen.getByText('Loading');
    const moviesDescription = screen.getByText('Please wait while we load our movies');

    expect(moviesHeader).toBeInTheDocument();
    expect(moviesDescription).toBeInTheDocument();
  });

  it('displays the right header when no movies are found', () => {
    (useMoviesData as jest.Mock).mockReturnValue({
      selectedMovie: null,
      loading: false,
      movies: [],
    });

    render(<Movies />);

    const moviesHeader = screen.getByText('We found 0 movies');
    const moviesDescription = screen.getByText('Select a movie to add your review');

    expect(moviesHeader).toBeInTheDocument();
    expect(moviesDescription).toBeInTheDocument();
  });

  it('displays the right header when one movie is found', () => {
    (useMoviesData as jest.Mock).mockReturnValue({
      selectedMovie: null,
      loading: false,
      movies: [{ id: 1, title: 'Mocked Movie' }],
    });

    render(<Movies />);

    const moviesHeader = screen.getByText('We found 1 movie');
    const moviesDescription = screen.getByText('Select a movie to add your review');

    expect(moviesHeader).toBeInTheDocument();
    expect(moviesDescription).toBeInTheDocument();
  });

  it('displays the right header when multiple movies are found', () => {
    (useMoviesData as jest.Mock).mockReturnValue({
      selectedMovie: null,
      loading: false,
      movies: [{ id: 1, title: 'Mocked Movie' }, { id: 1, title: 'Mocked Movie' }, { id: 1, title: 'Mocked Movie' }],
    });

    render(<Movies />);

    const moviesHeader = screen.getByText('We found 3 movies');
    const moviesDescription = screen.getByText('Select a movie to add your review');

    expect(moviesHeader).toBeInTheDocument();
    expect(moviesDescription).toBeInTheDocument();
  });

  it('renders RefreshMoviesButton correctly', () => {
    render(<Movies />);
    const refreshMoviesButton = screen.getByTestId('mocked-refresh-movies-button');
    expect(refreshMoviesButton).toBeInTheDocument();
  });

  it('renders MoviesTable correctly', () => {
    const movies = [{ id: 1, title: 'Mocked Movie' }];
    (useMoviesData as jest.Mock).mockReturnValue({
      selectedMovie: null,
      loading: false,
      movies,
    });
    render(<Movies />);
    const moviesTable = screen.getByTestId('mocked-movies-table');
    expect(moviesTable).toBeInTheDocument();
    expect(MoviesTable).toHaveBeenCalledWith({ movies }, {});
  });

  it('renders ReviewForm correctly when a movie is selected', () => {
    const selectedMovie = { id: 1, title: 'Mocked Movie' };
    (useMoviesData as jest.Mock).mockReturnValue({
      selectedMovie,
      loading: false,
      movies: [selectedMovie],
    });
    render(<Movies />);

    const reviewForm = screen.getByTestId('mocked-review-form');
    expect(reviewForm).toBeInTheDocument();
    expect(ReviewForm).toHaveBeenCalledWith({ movie: selectedMovie }, {});
  });

  it('does not render ReviewForm when no movie is selected', () => {
    (useMoviesData as jest.Mock).mockReturnValue({
      selectedMovie: null,
      loading: false,
      movies: [{ id: 1, title: 'Mocked Movie' }]
    });

    render(<Movies />);

    const reviewForm = screen.queryByTestId('mocked-review-form');
    expect(reviewForm).not.toBeInTheDocument();
  });
});
