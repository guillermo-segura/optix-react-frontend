import { useContext } from "react";
import { Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Autorenew } from "@mui/icons-material";

import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { Context as MoviesContext } from '../../context/MoviesContext';

export const RefreshMoviesButton = () => {
  const { fetchMovies } = useContext(MoviesContext);
  const { fetchMovieCompanies } = useContext(MovieCompaniesContext);
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    >
        {isSmallScreen ? <Autorenew /> : 'Refresh'}
    </Button>
  );
}