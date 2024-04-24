import { Box, Typography } from '@mui/material';

import { MoviesHeader } from '../moviesHeader/MoviesHeader';
import { MoviesTable } from '../moviesTable/MoviesTable';
import { RefreshMoviesButton } from '../refreshMoviesButton/RefreshMoviesButton';
import { useMoviesData } from '../../hooks/useMoviesData/useMoviesData';
import { ReviewForm } from '../reviewForm/ReviewForm';

export const Movies = () =>  {
  const { selectedMovie } = useMoviesData();
  return (
    <>
      <MoviesHeader />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" component="p">
          Please select a movie to add your review
        </Typography>
        <RefreshMoviesButton />
      </Box>
      <MoviesTable />
      {selectedMovie && <ReviewForm movie={selectedMovie} />}
    </>
  );
}