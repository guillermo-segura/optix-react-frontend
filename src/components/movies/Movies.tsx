import { useRef } from 'react';

import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Rating } from '../generic/rating/Rating';

const PAGE_SIZE = 10;

// TODO: use https://giddy-beret-cod.cyclic.app/movieCompanies
const mockMovieCompanyData: any = [
  {id: "1", name: "Test Productions"},
];

// TODO: use https://giddy-beret-cod.cyclic.app/movies
const mockMovieData: any = [
  {id: "1", reviews: [6,8,3,9,8,7,8], title: "A Testing Film", filmCompanyId: "1", cost : 534, releaseYear: 2005},
  {id: "2", reviews: [5,7,3,4,1,6,3], title: "Mock Test Film", filmCompanyId: "1", cost : 6234, releaseYear: 2006},
];

export interface MoviesProps {
  selectedMovie?: any;
  setSelectedMovie: (movie: any) => void;
}

const columns: GridColDef<(typeof mockMovieData)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
    editable: false,
  },
  {
    field: 'filmCompanyId',
    headerName: 'Company',
    width: 200,
    editable: false,
    valueGetter: (value) => mockMovieCompanyData.find((f: any) => f.id === value)?.name
  },
  {
    field: 'reviews',
    headerName: 'Reviews',
    width: 150,
    editable: false,
    renderCell: ({ value }) => <Rating values={value} />,
  },
  {
    field: 'releaseYear',
    headerName: 'Release year',
    editable: false,
    width: 100,
  },
];

export const Movies = ({ setSelectedMovie , selectedMovie }: MoviesProps) =>  {
  const movieLength = useRef(mockMovieData.length);
  return (
    <div>
      <h2>We've found {movieLength.current} movies in total</h2>
      <p>Please select a movie to add a review</p>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={mockMovieData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: PAGE_SIZE,
              },
            },
          }}
          onRowSelectionModelChange={(selectedMovieId) => {
            const movie = mockMovieData.find((movie) => movie.id === selectedMovieId[0]);
            console.log(selectedMovieId, mockMovieData, movie);
            setSelectedMovie(movie);
          }}
          checkboxSelection
          disableMultipleRowSelection
        />
      </Box>
    </div>
  );
}