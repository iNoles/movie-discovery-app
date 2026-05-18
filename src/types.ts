export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;          // OMDb always returns this as a string
  Poster: string;        // Often "N/A"
  Type?: "movie" | "series" | "episode" | string;
}

export interface MovieDetails extends Movie {
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre: string;
  Director?: string;
  Writer?: string;
  Actors: string;
  Plot: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore?: string;
  imdbRating: string;     // still a string from OMDb
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

export interface ApiResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}
