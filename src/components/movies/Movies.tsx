import { useEffect, useContext } from 'react';

import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Rating } from '../generic/rating/Rating';
import { RefreshButton } from '../refreshButton/RefreshButton';
import { MoviesHeader } from '../moviesHeader/MoviesHeader';
import { Context as MoviesContext } from '../../context/MoviesContext';
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';

const PAGE_SIZE = 10;

export interface MoviesProps {
  selectedMovie?: any;
  setSelectedMovie: (movie: any) => void;
}

const columns: GridColDef<(typeof mockMovieData)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'title',
    headerName: 'Title',
    width: 180,
    editable: false,
  },
  {
    field: 'companyName',
    headerName: 'Company',
    width: 180,
    editable: false,
  },
  {
    field: 'reviews',
    headerName: 'Reviews',
    width: 150,
    editable: false,
    renderCell: ({ value }) => <Rating values={value} readOnly />,
  },
  {
    field: 'releaseYear',
    headerName: 'Release year',
    editable: false,
    width: 100,
  },
];

export const Movies = () =>  {
  const { fetchMovies, state: { movies, selectedMovie }, selectMovie } = useContext(MoviesContext);
  const { fetchMovieCompanies, state: { movieCompanies } } = useContext(MovieCompaniesContext);

  useEffect(() => {
    fetchMovieCompanies();
    fetchMovies();
  }, []);

  const rows = movies.map((movie) => {
    const company = movieCompanies.find((company) => company.id === movie.filmCompanyId);
    return {
      ...movie,
      companyName: company ? company.name : '-',
    };
  });

  return (
    <div>
      <MoviesHeader moviesCount={movies.length} />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <p>Please select a movie to add a review</p>
        <RefreshButton />
      </Box>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: PAGE_SIZE,
              },
            },
          }}
          pageSizeOptions={[PAGE_SIZE]}
          onRowSelectionModelChange={(selectedMovieId) => {
            const movie = rows.find((movie) => movie.id === selectedMovieId[0]);
            selectMovie(movie);
          }}
          rowSelectionModel={selectedMovie?.id ? [selectedMovie.id] : []}
          checkboxSelection
          disableMultipleRowSelection
        />
      </Box>
    </div>
  );
}