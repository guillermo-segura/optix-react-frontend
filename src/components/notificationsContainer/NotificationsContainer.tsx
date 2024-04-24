import { useContext } from 'react';
import { Box } from '@mui/material';

import { Notification } from '../generic/notification/Notification';
import { Context as MoviesContext } from '../../context/MoviesContext';
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';

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
    <Box sx={{ position: 'absolute', top: '0px', right: '16px' }} display="flex" flexDirection="column" alignItems="end">
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