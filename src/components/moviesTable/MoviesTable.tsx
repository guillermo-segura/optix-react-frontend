import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { Movie } from '../../utils/types/models';
import { round, avg } from '../../utils/helpers/math';
import { useMoviesContext } from '../../context/MoviesContext';
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

export interface MoviesTableProps {
  movies: Movie[];
}

export const MoviesTable = ({ movies }: MoviesTableProps) =>  {
  const { state: { selectedMovie }, selectMovie } = useMoviesContext();

  const onClickRow = (selectedMovieIds: GridRowSelectionModel) => {
    const movie = movies.find((movie) => movie.id === selectedMovieIds[0]);
    selectMovie(movie);
  };

  return (
    <Table
      rows={movies}
      columns={columns}
      onClickRow={onClickRow}
      selectedRow={selectedMovie ? [selectedMovie.id] : []}
    />
  );
}