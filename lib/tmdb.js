// This file provides all the helper functions to fetch movie data directly from the TMDB API.
// It handles authentication, retries, and transforms TMDB data for use in the website UI. All movie info, images, and search features rely on these helpers.


const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Get TMDB API key from environment
function getApiKey() {
  const apiKey = process.env.TMDB_API_READ_ACCESS_TOKEN;
  if (!apiKey) throw new Error('TMDB API key missing in environment variables.');
  return apiKey;
}

// Create headers for TMDB requests
function createHeaders() {
  return {
    'Authorization': `Bearer ${getApiKey()}`,
    'Content-Type': 'application/json'
  };
}

// Make a TMDB API request with retries and timeout
async function tmdbRequest(endpoint, options = {}) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const url = TMDB_BASE_URL + endpoint;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt));
      const response = await fetch(url, {
        headers: createHeaders(),
        signal: controller.signal,
        ...options
      });
      clearTimeout(timeout);
      if (!response.ok) {
        if (response.status === 429) throw new Error('Rate limit exceeded.');
        throw new Error(`TMDB API Error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      if (attempt === 2) throw err;
    }
  }
}

// Movie-related API functions
// Movie API functions
export const tmdbMovies = {
  // Get popular movies
  getPopular: (page = 1) => tmdbRequest(`/movie/popular?page=${page}`),
  // Get top rated movies
  getTopRated: (page = 1) => tmdbRequest(`/movie/top_rated?page=${page}`),
  // Get now playing movies
  getNowPlaying: (page = 1) => tmdbRequest(`/movie/now_playing?page=${page}`),
  // Get upcoming movies
  getUpcoming: (page = 1) => tmdbRequest(`/movie/upcoming?page=${page}`),
  // Get movie details with credits, videos, similar
  getDetails: (movieId) => tmdbRequest(`/movie/${movieId}?append_to_response=credits,videos,similar`),
  // Search movies by query
  search: (query, page = 1) => tmdbRequest(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`),
  // Discover movies with filters
  discover: (filters = {}) => {
    const params = new URLSearchParams({
      page: filters.page || 1,
      sort_by: filters.sortBy || 'popularity.desc',
      ...(filters.genre && { with_genres: filters.genre }),
      ...(filters.year && { year: filters.year }),
      ...(filters.minRating && { 'vote_average.gte': filters.minRating }),
      ...(filters.maxRating && { 'vote_average.lte': filters.maxRating })
    });
    return tmdbRequest(`/discover/movie?${params}`);
  }
};

// Configuration and utility functions
// TMDB config and genres
export const tmdbConfig = {
  getConfiguration: () => tmdbRequest('/configuration'),
  getGenres: () => tmdbRequest('/genre/movie/list')
};

// Image URL helper functions
// Image URL helpers
export const tmdbImages = {
  getImageUrl: (path, size = 'w500') => path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : null,
  getPosterUrl: (path, size = 'w500') => tmdbImages.getImageUrl(path, size),
  getBackdropUrl: (path, size = 'w1280') => tmdbImages.getImageUrl(path, size),
  getProfileUrl: (path, size = 'w185') => tmdbImages.getImageUrl(path, size)
};

// Data transformation utilities
// Data transformation helpers
export const tmdbUtils = {
  // Convert TMDB movie to app format
  transformMovie: (m) => ({
    id: m.id,
    title: m.title,
    year: m.release_date ? new Date(m.release_date).getFullYear().toString() : 'TBA',
    genre: m.genres ? m.genres[0]?.name : 'Unknown',
    rating: m.vote_average ? m.vote_average.toFixed(1) : 'N/A',
    poster: tmdbImages.getPosterUrl(m.poster_path),
    backdrop: tmdbImages.getBackdropUrl(m.backdrop_path),
    description: m.overview || 'No description available.',
    director: m.credits?.crew?.find(p => p.job === 'Director')?.name || 'Unknown',
    cast: m.credits?.cast?.slice(0, 5).map(a => a.name) || [],
    duration: m.runtime ? `${m.runtime} min` : 'Unknown',
    popularity: m.popularity ? Math.round(m.popularity) : 0,
    releaseDate: m.release_date,
    originalTitle: m.original_title,
    originalLanguage: m.original_language,
    adult: m.adult,
    voteCount: m.vote_count
  }),
  // Convert array of movies
  transformMovies: (arr) => arr.map(tmdbUtils.transformMovie),
  // Format runtime as h m
  formatRuntime: (min) => {
    if (!min) return 'Unknown';
    const h = Math.floor(min / 60), m = min % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }
};

// Export all helpers
export default {
  movies: tmdbMovies,
  config: tmdbConfig,
  images: tmdbImages,
  utils: tmdbUtils
};
