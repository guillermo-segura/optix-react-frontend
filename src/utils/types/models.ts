export interface Movie {
  id: string,
  reviews: number[],
  title: string,
  filmCompanyId: string,
  cost: number,
  releaseYear: number,
  companyName?: string,
}

export interface MovieCompany {
  id: string,
  name: string,
};
