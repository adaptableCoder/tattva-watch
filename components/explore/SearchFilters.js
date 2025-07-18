"use client"
import { useState } from 'react'

const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedGenre, 
  setSelectedGenre, 
  selectedYear, 
  setSelectedYear, 
  sortBy, 
  setSortBy,
  totalMovies,
  filteredCount
}) => {
  // Filter options
  const genres = ['All', 'Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Horror', 'Romance', 'Adventure', 'Crime']
  const years = ['All', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016']
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'year', label: 'Newest First' },
    { value: 'title', label: 'A-Z' }
  ]

  return (
    <section className="px-4 sm:px-6 lg:px-8 -mt-8">
      <div className="max-w-7xl mx-auto">
        {/* Search and Filters */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search movies, directors, actors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500/50 focus:bg-white/15 transition-all duration-200"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/15 transition-all duration-200"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-black text-white">
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/15 transition-all duration-200"
              >
                {years.map(year => (
                  <option key={year} value={year} className="bg-black text-white">
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/15 transition-all duration-200"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-black text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <span className="text-white/60 text-sm">
              Showing {filteredCount} of {totalMovies} movies
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchFilters
