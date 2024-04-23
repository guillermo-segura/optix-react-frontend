import { useState } from 'react';
// import { easeIn, easeOut } from "polished";
// import { useBoolean } from "react-use";
// import { createReducer }from "@reduxjs/toolkit"

import { Movies } from '../movies/Movies';
import { ReviewForm } from '../reviewForm/ReviewForm';
import { RefreshButton } from '../refreshButton/RefreshButton';

export const App = () =>  {
  const [selectedMovie, setSelectedMovie] = useState(null); 

  return (
    <div>
      <h1>Welcome to Movie database!</h1>
      <RefreshButton />
      <Movies selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
      <br/>
      <div>
       {!selectedMovie && <p>No Movie Selected</p>}
       {selectedMovie && <ReviewForm selectedMovie={selectedMovie} />}
      </div>
    </div>
  );
}