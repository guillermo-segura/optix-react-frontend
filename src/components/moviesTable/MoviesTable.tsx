import { useContext } from 'react';
import { GridColDef } from '@mui/x-data-grid';

import { Rating } from '../generic/rating/Rating';
import { Context as MoviesContext } from '../../context/MoviesContext';
import { Context as MovieCompaniesContext } from '../../context/MovieCompaniesContext';
import { Table } from '../generic/table/Table';

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

export const MoviesTable = () =>  {
  const { state: { movies, selectedMovie }, selectMovie } = useContext(MoviesContext);
  const { state: { movieCompanies } } = useContext(MovieCompaniesContext);

  const rows = movies.map((movie) => {
    const company = movieCompanies.find((company) => company.id === movie.filmCompanyId);
    return {
      ...movie,
      companyName: company ? company.name : '-',
    };
  });

  const onClickRow = (selectedMovieId) => {
    const movie = rows.find((movie) => movie.id === selectedMovieId[0]);
    selectMovie(movie);
  };

  const selectedRow = selectedMovie?.id ? [selectedMovie.id] : [];

  return (
    <Table rows={rows} columns={columns} onClickRow={onClickRow} selectedRow={selectedRow}/>
  );
}