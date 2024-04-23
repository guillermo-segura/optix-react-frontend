export interface MoviesHeaderProps {
  moviesCount?: number;
}


export const MoviesHeader = ({ moviesCount = 0 }: MoviesHeaderProps) =>  {
  return (
    <>
      {moviesCount > 1 && <h2>We've found {moviesCount} movies in total</h2>}
      {moviesCount === 1 && <h2>We've found just 1 movie</h2>}
      {moviesCount < 1 && <h2>We haven't found any movie</h2>}
    </>
  );
}