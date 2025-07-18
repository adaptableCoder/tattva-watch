"use client"
import React, { useState, useEffect } from 'react'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ExploreHero from '@/components/explore/ExploreHero'
import MoviesGrid from '@/components/explore/MoviesGrid'

import { movieApi, movieUtils } from '@/lib/api'

const Explore = () => {
  // Basic state management
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Load popular movies on mount
  useEffect(() => {
    fetchMovies()
  }, [])

  // Simple function to fetch movies (search or popular)
  const fetchMovies = async (query = '') => {
    setLoading(true)
    setError(null)
    
    try {
      let moviesData
      
      if (query.trim()) {
        // Search movies
        moviesData = await movieApi.search(query, 1)
      } else {
        // Get popular movies
        moviesData = await movieApi.discover({ page: 1, sortBy: 'popularity.desc' })
      }

      // Transform data
      const transformedMovies = moviesData.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movieUtils.getYear(movie.release_date),
        genre: 'Movie',
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
        poster: movieUtils.getPosterUrl(movie.poster_path),
        description: movie.overview || 'No description available.',
        director: 'Unknown',
        duration: 'Unknown'
      }))

      setMovies(transformedMovies)
    } catch (error) {
      setError('Failed to load movies. Please try again.')
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // Debounce search to avoid excessive API calls
    setTimeout(() => {
      fetchMovies(query)
    }, 300)
  }

  return (
    <>
      <main className="min-h-screen bg-[#0B0B0F] text-white">
        {/* Navigation */}
        <Navbar />
        
        {/* Hero section */}
        <ExploreHero />
        
        {/* Simple Search */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
        
        {/* Error state */}
        {error ? (
          <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-white mb-4">Something went wrong</h3>
                <p className="text-white/60 mb-6">{error}</p>
                <button
                  onClick={fetchMovies}
                  className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-full border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300"
                >
                  Retry
                </button>
              </div>
            </div>
          </section>
        ) : (
          /* Movies grid */
          <MoviesGrid
            movies={movies}
            loading={loading}
          />
        )}
        
        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}

export default Explore