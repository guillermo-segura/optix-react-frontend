import { useContext, useMemo } from 'react';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { Movie } from '../../utils/types/models';
import { round, avg } from '../../utils/helpers/math';
import { Context as MoviesContext } from '../../context/MoviesContext';
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { Review } from '../generic/review/Review';
import { Table } from '../generic/table/Table';

const columns: GridColDef<Movie[]>[] = [
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
    width: 220,
    editable: false,
    valueGetter: (value) => round(avg(value), 1),
    renderCell: ({ value }) => <Review value={value} readOnly />,
  },
  {
    field: 'releaseYear',
    headerName: 'Release year',
    editable: false,
    width: 100,
  },
];

export const MoviesTable = () =>  {
  const { state: { movies, selectedMovie }, selectMovie } = useContext(MoviesContext);
  const { state: { movieCompanies } } = useContext(MovieCompaniesContext);

  const rows = useMemo(() => movies.map((movie) => {
    const company = movieCompanies.find((company) => company.id === movie.filmCompanyId);
    return {
      ...movie,
      companyName: company ? company.name : '',
    };
  }), [JSON.stringify(movies), JSON.stringify(movieCompanies)]);

  const onClickRow = (selectedMovieIds: GridRowSelectionModel) => {
    const movie = rows.find((movie) => movie.id === selectedMovieIds[0]);
    selectMovie(movie);
  };

  return (
    <Table
      rows={rows}
      columns={columns}
      onClickRow={onClickRow}
      selectedRow={selectedMovie ? [selectedMovie.id] : []}
    />
  );
}