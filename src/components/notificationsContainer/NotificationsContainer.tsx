import { useContext } from 'react';
import { Box } from '@mui/material';

import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { Context as MoviesContext } from '../../context/MoviesContext';
import { Notification } from '../generic/notification/Notification';

export const NotificationsContainer = () =>  {
  const {
    closeNotification: closeMoviesNotification,
    state: { notification: moviesNotification },
  } = useContext(MoviesContext);
  const {
    closeNotification: closeMovieCompaniesNotification,
    state: { notification: movieCompaniesNotification },
  } = useContext(MovieCompaniesContext);

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