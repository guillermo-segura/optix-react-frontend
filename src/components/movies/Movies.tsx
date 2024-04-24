import { Box } from '@mui/material';

import { MoviesHeader } from '../moviesHeader/MoviesHeader';
import { MoviesTable } from '../moviesTable/MoviesTable';
import { RefreshMoviesButton } from '../refreshMoviesButton/RefreshMoviesButton';
import { useMoviesData } from '../../hooks/useMoviesData/useMoviesData';
import { Notification } from '../generic/notification/Notification';

export const Movies = () =>  {
  const { movieCompaniesNotification, moviesNotification, closeMoviesNotification, closeMovieCompaniesNotification } = useMoviesData();
  return (
    <>
      <MoviesHeader />
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: '-120px', right: '0px' }} display="flex" flexDirection="column" alignItems="end">
          {moviesNotification.visible && (
            <Notification
              severity={moviesNotification.type}
              content={moviesNotification.content}
              onClose={closeMoviesNotification}
            />
          )}
          {movieCompaniesNotification.visible && (
            <Notification
              severity={movieCompaniesNotification.type}
              content={movieCompaniesNotification.content}
              onClose={closeMovieCompaniesNotification}
            />
          )}
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <p>Please select a movie to add your review</p>
        <RefreshMoviesButton />
      </Box>
      <MoviesTable />
    </>
  );
}