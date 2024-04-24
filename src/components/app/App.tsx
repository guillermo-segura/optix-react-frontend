import { Container, Typography } from '@mui/material';
// import { easeIn, easeOut } from "polished";
// import { useBoolean } from "react-use";
// import { createReducer }from "@reduxjs/toolkit"

import { Movies } from '../movies/Movies';
import { ReviewForm } from '../reviewForm/ReviewForm';
import { Provider as MoviesProvider } from '../../context/MoviesContext';
import { Provider as MovieCompaniesProvider } from '../../context/MovieCompaniesContext';

export const App = () =>  {
  return (
    <MovieCompaniesProvider>
      <MoviesProvider>
        <Container>
          <Typography variant="h2" component="h2" sx={{ marginTop: '24px' }}>
            Welcome to MovieDB!
          </Typography>
          <hr />
          <Movies />
          <ReviewForm />
        </Container>
      </MoviesProvider>
    </MovieCompaniesProvider>
  );
}