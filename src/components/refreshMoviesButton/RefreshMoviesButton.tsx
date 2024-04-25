import { useContext } from 'react';
import { Button } from '@mui/material';
import { Autorenew } from '@mui/icons-material';

import { useScreenSize } from '../../hooks/useScreenSize/useScreenSize';
import { Context as MoviesContext } from '../../context/MoviesContext';
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';

export const RefreshMoviesButton = () => {
  const { fetchMovies, state: { loading } } = useContext(MoviesContext);
  const { fetchMovieCompanies } = useContext(MovieCompaniesContext);
  const screenSize = useScreenSize();

  const isSmallScreen = screenSize === 'sm';

  const onClick = () => {
    fetchMovieCompanies();
    fetchMovies();
  };

  return (
    <Button
      variant="text"
      size="small"
      startIcon={!isSmallScreen && <Autorenew />}
      onClick={onClick}
      disabled={loading}
    >
        {isSmallScreen && <Autorenew />}
        {!isSmallScreen && (loading ? 'Refreshing' : 'Refresh')}
    </Button>
  );
}