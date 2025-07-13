"use client"
import React, { useState, useMemo } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ExploreHero from '@/components/explore/ExploreHero'
import SearchFilters from '@/components/explore/SearchFilters'
import MoviesGrid from '@/components/explore/MoviesGrid'
import { moviesData, filterMovies, sortMovies } from '@/data/moviesData'

const Explore = () => {
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [sortBy, setSortBy] = useState('popularity')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and sort movies using useMemo for performance
  const filteredAndSortedMovies = useMemo(() => {
    const filters = { selectedGenre, selectedYear, searchQuery }
    const filtered = filterMovies(moviesData, filters)
    return sortMovies(filtered, sortBy)
  }, [selectedGenre, selectedYear, searchQuery, sortBy])

  const handleClearFilters = () => {
    setSelectedGenre('All')
    setSelectedYear('All')
    setSearchQuery('')
    setSortBy('popularity')
  }

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white">
      <Navbar />
      
      <ExploreHero />
      
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalMovies={moviesData.length}
        filteredCount={filteredAndSortedMovies.length}
      />
      
      <MoviesGrid
        movies={filteredAndSortedMovies}
        onClearFilters={handleClearFilters}
      />
      
      <Footer />
    </main>
  )
}

export default Explore