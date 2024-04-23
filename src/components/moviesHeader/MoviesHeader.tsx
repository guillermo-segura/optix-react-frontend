import { useContext } from "react";

import { Context as MoviesContext } from "../../context/MoviesContext";
export interface MoviesHeaderProps {
  moviesCount?: number;
}


export const MoviesHeader = () =>  {
  const { state: { movies } } = useContext(MoviesContext);

  const getHeader = (count: number): string => {
    if (count < 1) {
      return 'Sorry, there are no movies this time';
    }

    if (count === 1) {
      return 'There is 1 movie in our DB';
    }

    return `There are ${count} movies in our DB`;
  }
  return (
    <h2>{getHeader(movies.length)}</h2>
  );
}