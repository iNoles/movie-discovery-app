import axios from "axios";
import type { Movie, ApiResponse, MovieDetails } from "./types";

const apiKey = "8f8d37d2";
const apiUrl = "https://www.omdbapi.com/";

function hasApiKey(): boolean {
  if (!apiKey) {
    console.warn("OMDb API key missing — skipping network call and returning empty result.");
    return false;
  }
  return true;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!hasApiKey()) return [];

  try {
    const url = `${apiUrl}?s=${encodeURIComponent(query)}&apikey=${apiKey}`;
    const response = await axios.get<ApiResponse>(url);

    if (response.data.Response !== "True" || !response.data.Search) {
      return [];
    }

    return response.data.Search;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function fetchMovieDetails(id: string): Promise<MovieDetails | null> {
  if (!hasApiKey()) return null;

  try {
    const url = `${apiUrl}?i=${encodeURIComponent(id)}&plot=full&apikey=${apiKey}`;
    const response = await axios.get<MovieDetails>(url);

    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}
