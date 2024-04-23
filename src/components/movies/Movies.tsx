import { Box } from '@mui/material';
import { RefreshButton } from '../refreshButton/RefreshButton';
import { MoviesHeader } from '../moviesHeader/MoviesHeader';
import { MoviesTable } from '../moviesTable/MoviesTable';
import { useMoviesData } from '../../hooks/useMoviesData/useMoviesData';

export interface MoviesProps {
  selectedMovie?: any;
  setSelectedMovie: (movie: any) => void;
}

export const Movies = () =>  {
  useMoviesData();
  return (
    <>
      <MoviesHeader />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <p>Please select a movie to add your review</p>
        <RefreshButton />
      </Box>
      <MoviesTable />
    </>
  );
}