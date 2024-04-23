import { useState, useContext } from 'react';
import { Container } from '@mui/material';
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
          <h1>Welcome to Movie database!</h1>
          <br />
          <Movies />
          <ReviewForm />
        </Container>
      </MoviesProvider>
    </MovieCompaniesProvider>
  );
}