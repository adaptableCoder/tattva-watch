"use client"
import React, { useState, useEffect } from 'react'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import ExploreHero from '@/components/explore/ExploreHero'
import MoviesGrid from '@/components/explore/MoviesGrid'
import SearchFilters from '@/components/explore/SearchFilters'
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

  // Handle search input change (debounced)
  const handleSearchChange = (query) => {
    setSearchQuery(query)
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
        
        {/* Search Bar with SearchFilters styling */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          loading={loading}
        />
        
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