// Simple watchlist helper functions - no hooks needed
export const watchlistAPI = {
  // Get user's watchlist
  async get() {
    const response = await fetch('/api/watchlist')
    const data = await response.json()
    return response.ok ? data.watchlist : []
  },

  // Add movie to watchlist
  async add(movie) {
    const response = await fetch('/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: movie.id, movieData: movie })
    })
    return response.ok
  },

  // Remove movie from watchlist
  async remove(movieId) {
    const response = await fetch('/api/watchlist', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId })
    })
    return response.ok
  }
}

// Simple check function
export const isInWatchlist = (watchlist, movieId) => {
  return watchlist.some(item => item.movieId === movieId)
}
