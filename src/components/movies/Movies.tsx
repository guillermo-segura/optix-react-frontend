import { useEffect, useContext } from 'react';

import { Box } from '@mui/material';
import { RefreshButton } from '../refreshButton/RefreshButton';
import { MoviesHeader } from '../moviesHeader/MoviesHeader';
import { Context as MoviesContext } from '../../context/MoviesContext';
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { MoviesTable } from '../moviesTable/MoviesTable';

export interface MoviesProps {
  selectedMovie?: any;
  setSelectedMovie: (movie: any) => void;
}

export const Movies = () =>  {
  const { fetchMovies } = useContext(MoviesContext);
  const { fetchMovieCompanies } = useContext(MovieCompaniesContext);

  useEffect(() => {
    fetchMovieCompanies();
    fetchMovies();
  }, []);

  return (
    <div>
      <MoviesHeader />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <p>Please select a movie to add a review</p>
        <RefreshButton />
      </Box>
      <MoviesTable />
    </div>
  );
}