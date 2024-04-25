import { Button } from '@mui/material';
import { Autorenew } from '@mui/icons-material';

import { useScreenSize } from '../../hooks/useScreenSize/useScreenSize';
import { useMoviesContext } from '../../context/movies/MoviesContext';
import { useMovieCompaniesContext } from '../../context/MovieCompaniesContext';

export const RefreshMoviesButton = () => {
  const { fetchMovies, state: { loading } } = useMoviesContext();
  const { fetchMovieCompanies } = useMovieCompaniesContext();
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