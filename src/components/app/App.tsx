import { Container, Typography } from '@mui/material';

import { Movies } from '../movies/Movies';
import { Provider as MoviesProvider } from '../../context/MoviesContext';
import { Provider as MovieCompaniesProvider } from '../../context/MovieCompaniesContext';
import { NotificationsContainer } from '../notificationsContainer/NotificationsContainer';

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