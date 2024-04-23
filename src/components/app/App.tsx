import { useState } from 'react';
import { Container } from '@mui/material';
// import { easeIn, easeOut } from "polished";
// import { useBoolean } from "react-use";
// import { createReducer }from "@reduxjs/toolkit"

import { Movies } from '../movies/Movies';
import { ReviewForm } from '../reviewForm/ReviewForm';
import { RefreshButton } from '../refreshButton/RefreshButton';

export const App = () =>  {
  const [selectedMovie, setSelectedMovie] = useState(null); 

  return (
    <Container>
      <h1>Welcome to Movie database!</h1>
      <RefreshButton />
      <Movies selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
      {selectedMovie && <ReviewForm selectedMovie={selectedMovie} />}
    </Container>
  );
}