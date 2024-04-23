import { Autorenew } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from "@mui/material";
import { useContext } from "react";
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { Context as MoviesContext } from '../../context/MoviesContext';



export const RefreshButton = () => {
  const { fetchMovies } = useContext(MoviesContext);
  const { fetchMovieCompanies } = useContext(MovieCompaniesContext);
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onClick = () => {
    fetchMovieCompanies();
    fetchMovies();
  };

  if (isSmallScreen) {
    return (
      <Button
        variant="text"
        size="small"
        onClick={onClick}
      >
          <Autorenew />
      </Button>
    );
  }

  return (
    <Button
      variant="text"
      size="small"
      startIcon={<Autorenew />}
      onClick={onClick}
    >
        Refresh
    </Button>
  );
}