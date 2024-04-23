// TODO: use https://giddy-beret-cod.cyclic.app/movieCompanies
const mockMovieCompanyData: any = [
  {id: "1", name: "Test Productions"},
];

export const RefreshButton = () => {
  const refreshButton = (buttonText: any) => {
    if (mockMovieCompanyData) {
      return <button>{buttonText}</button>
    } else {
      return <p>No movies loaded yet</p>
    }   
  };

  return refreshButton("Refresh");
}