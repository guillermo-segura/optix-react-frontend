import { Container, Typography } from '@mui/material';

import { MoviesProvider } from '../../context/movies/MoviesContext';
import { MovieCompaniesProvider } from '../../context/movieCompanies/MovieCompaniesContext';
import { NotificationsContainer } from '../notificationsContainer/NotificationsContainer';
import { Movies } from '../movies/Movies';

export const App = () =>  {
  return (
    <MovieCompaniesProvider>
      <MoviesProvider>
        <Container sx={{ position: 'relative', paddingBottom: '80px' }}>
          <NotificationsContainer />
          <Typography variant="h2" component="h2" sx={{ marginTop: '24px' }}>
            Welcome to MovieDB!
          </Typography>
          <hr />
          <Movies />
        </Container>
      </MoviesProvider>
    </MovieCompaniesProvider>
  );
}