import { useRef } from 'react';

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

export const Movies = ({ setSelectedMovie , selectedMovie }: MoviesProps) =>  {
  const movieLength = useRef(mockMovieData.length);
  return (
    <div>
      <p>Total movies displayed {movieLength.current}</p>
      <span>Title - Review - Film Company</span>
      <br />
      <br />
      {mockMovieData.map((movie: any) => 
        <span onClick={() => {setSelectedMovie(movie)}}>
          {movie.title}{" "}
          {movie.reviews.reduce((acc: any, i: any) => (acc + i)/movie.reviews.length, 0)?.toString().substring(0, 3)}{" "}
          {mockMovieCompanyData.find((f: any) => f.id === movie.filmCompanyId)?.name}
          <br/>
        </span>
      )}
    </div>
  );
}