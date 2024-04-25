import { Box, Typography } from '@mui/material';

import { RefreshMoviesButton } from '../refreshMoviesButton/RefreshMoviesButton';
import { useMoviesData } from '../../hooks/useMoviesData/useMoviesData';
import { MoviesTable } from '../moviesTable/MoviesTable';
import { ReviewForm } from '../reviewForm/ReviewForm';

const getHeaderContent = (count: number, loading: boolean): string => {
  if (count > 1) {
    return `We found ${count} movies`;
  }

  if (count === 1) {
    return 'We found 1 movie';
  }

  return loading ? 'Loading' : 'We found 0 movies';
};

export const Movies = () =>  {
  const { selectedMovie, loading, movies } = useMoviesData();
  const isLoadingState = movies.length < 1 && loading;

  return (
    <>
      <Typography variant="h4" component="h4" sx={{ padding: '24px 0' }}>
        {getHeaderContent(movies.length, isLoadingState)}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" component="p">
          {isLoadingState
            ? 'Please wait while we load our movies'
            : 'Select a movie to add your review'}
        </Typography>
        <RefreshMoviesButton />
      </Box>
      <MoviesTable movies={movies} />
      {selectedMovie && <ReviewForm movie={selectedMovie} />}
    </>
  );
}