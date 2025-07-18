// This file provides all the helper functions to fetch movie data from your own backend API routes (which in turn call TMDB).
// It handles API requests, retries, and transforms movie data for use in the website UI. All movie search, details, and discovery features rely on these helpers.


const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://tattva-watch.vercel.app' : '';

// Wait helper
const delay = ms => new Promise(r => setTimeout(r, ms));

// Make an API request with retries and timeout
async function apiRequest(endpoint, options = {}, retries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const url = `${API_BASE_URL}/api${endpoint}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        ...options
      });
      clearTimeout(timeout);
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || err.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (err) {
      lastError = err;
      if (err.name === 'AbortError') throw new Error('Request timed out');
      if (err.message.includes('404') || err.message.includes('400')) throw err;
      if (attempt < retries) await delay(1000 * attempt);
    }
  }
  throw new Error(`Failed after ${retries} attempts: ${lastError.message}`);
}

// Movie API functions
// Movie API functions
export const movieApi = {
  getPopular: (page = 1) => apiRequest(`/movies/popular?page=${page}`),
  getDetails: (movieId) => apiRequest(`/movies/${movieId}`),
  search: (query, page = 1) => apiRequest(`/movies/search?q=${encodeURIComponent(query)}&page=${page}`),
  discover: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', filters.page);
    if (filters.sortBy) params.append('sort_by', filters.sortBy);
    if (filters.genre) params.append('genre', filters.genre);
    if (filters.year) params.append('year', filters.year);
    if (filters.minRating) params.append('min_rating', filters.minRating);
    if (filters.maxRating) params.append('max_rating', filters.maxRating);
    const query = params.toString();
    return apiRequest(`/movies/discover${query ? `?${query}` : ''}`);
  },
  getGenres: () => apiRequest('/movies/genres')
};

// Utility functions for working with TMDB data
// Movie data helpers
export const movieUtils = {
  // Convert TMDB movie to app format
  transformMovie: (m) => ({
    id: m.id,
    title: m.title,
    year: m.release_date ? new Date(m.release_date).getFullYear().toString() : 'TBA',
    genre: m.genres ? m.genres[0]?.name || m.genre_ids?.[0] : 'Unknown',
    rating: m.vote_average ? m.vote_average.toFixed(1) : 'N/A',
    poster: m.poster_path,
    backdrop: m.backdrop_path,
    description: m.overview || 'No description available.',
    director: m.credits?.crew?.find(p => p.job === 'Director')?.name || 'Unknown',
    cast: m.credits?.cast?.slice(0, 5).map(a => a.name) || [],
    duration: m.runtime ? `${m.runtime} min` : 'Unknown',
    popularity: m.popularity ? Math.round(m.popularity) : 0,
    releaseDate: m.release_date,
    voteCount: m.vote_count
  }),
  // Get TMDB image URL
  getImageUrl: (path, size = 'w500') => path ? `https://image.tmdb.org/t/p/${size}${path}` : null,
  getPosterUrl: (path, size = 'w500') => movieUtils.getImageUrl(path, size),
  getBackdropUrl: (path, size = 'w1280') => movieUtils.getImageUrl(path, size),
  // Format duration as h m
  formatDuration: (min) => {
    if (!min) return 'Unknown';
    const h = Math.floor(min / 60), m = min % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  },
  // Get year from release date
  getYear: (date) => date ? new Date(date).getFullYear().toString() : 'TBA'
};

// Error handling utilities
// Error helpers
export const apiErrors = {
  isNetworkError: (e) => e.message.includes('fetch') || e.message.includes('network'),
  isNotFoundError: (e) => e.message.includes('404') || e.message.includes('not found'),
  getRateLimitRetryDelay: (e) => e.message.includes('rate limit') ? 250 : 0
};

// Export all helpers
export default {
  movies: movieApi,
  utils: movieUtils,
  errors: apiErrors
};
