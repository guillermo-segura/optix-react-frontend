import { useContext, useMemo } from 'react';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { Review } from '../generic/review/Review';
import { Context as MoviesContext } from '../../context/MoviesContext';
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { Table } from '../generic/table/Table';
import { Movie } from '../../utils/types/models';

const columns: GridColDef<Movie[]>[] = [
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
    editable: false,
  },
  {
    field: 'companyName',
    headerName: 'Company',
    width: 200,
    editable: false,
  },
  {
    field: 'reviews',
    headerName: 'Reviews',
    width: 200,
    editable: false,
    renderCell: ({ value }) => <Review values={value} readOnly />,
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

  const selectedRow = selectedMovie ? [selectedMovie.id] : [];

  return (
    <Table rows={rows} columns={columns} onClickRow={onClickRow} selectedRow={selectedRow}/>
  );
}