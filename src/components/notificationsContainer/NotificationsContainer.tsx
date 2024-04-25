import { Box } from '@mui/material';

import { useMovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { useMoviesContext } from '../../context/movies/MoviesContext';
import { Notification } from '../generic/notification/Notification';

export const NotificationsContainer = () =>  {
  const {
    closeNotification: closeMoviesNotification,
    state: { notification: moviesNotification },
  } = useMoviesContext();
  const {
    closeNotification: closeMovieCompaniesNotification,
    state: { notification: movieCompaniesNotification },
  } = useMovieCompaniesContext();

  return (
    <Box
      sx={{ position: 'fixed', top: '16px', right: '16px', zIndex: '1' }}
      display="flex"
      flexDirection="column"
      alignItems="end"
    >
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
  );
}