"use client"
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { moviesData } from '@/data/moviesData'

const MovieDetails = () => {
  const params = useParams()
  const router = useRouter()
  const [isWatchlistAdded, setIsWatchlistAdded] = useState(false)
  
  // Find the movie by ID
  const movie = moviesData.find(m => m.id === parseInt(params.id))
  
  // If movie not found, show 404
  if (!movie) {
    return (
      <main className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
          <button 
            onClick={() => router.push('/explore')}
            className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-full border border-orange-500/30 transition-all duration-300"
          >
            Back to Explore
          </button>
        </div>
      </main>
    )
  }

  const handleAddToWatchlist = () => {
    setIsWatchlistAdded(!isWatchlistAdded)
    console.log(`${isWatchlistAdded ? 'Removed from' : 'Added to'} watchlist: ${movie.title}`)
    // Future: API call to add/remove from watchlist
  }

  const handleWatchTrailer = () => {
    console.log(`Playing trailer for: ${movie.title}`)
    // Future: Open trailer modal or navigate to trailer
  }

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-[#0B0B0F] to-amber-500/5"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-orange-500/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative py-8 z-10">
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] bg-gradient-to-br from-orange-500/20 to-orange-600/30 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                <svg className="w-24 h-24 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2" />
                </svg>
              </div>
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Basic Info */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  {movie.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-lg">
                  <span className="text-white/70">{movie.year}</span>
                  <span className="text-orange-500 font-medium">★ {movie.rating}</span>
                  <span className="px-3 py-1 bg-orange-500/20 rounded-full text-orange-400 border border-orange-500/30">
                    {movie.genre}
                  </span>
                  <span className="text-white/70">{movie.duration}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToWatchlist}
                  className={`px-8 py-3 rounded-full border transition-all duration-300 shadow-lg ${
                    isWatchlistAdded
                      ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600'
                      : 'bg-orange-500/20 text-orange-500 border-orange-500/30 hover:bg-orange-500/30'
                  }`}
                >
                  {isWatchlistAdded ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
                <button
                  onClick={handleWatchTrailer}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg"
                >
                  Watch Trailer
                </button>
              </div>

              {/* Synopsis */}
              <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  {movie.description}
                </p>
              </div>

              {/* Director and Cast */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Director</h3>
                  <p className="text-orange-400 font-medium">{movie.director}</p>
                </div>
                <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Cast</h3>
                  <div className="space-y-2">
                    {movie.cast.map((actor, index) => (
                      <p key={index} className="text-white/80">{actor}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Details */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Movie Stats */}
            <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Movie Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Rating</span>
                  <span className="text-orange-400 font-medium">★ {movie.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Duration</span>
                  <span className="text-white">{movie.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Genre</span>
                  <span className="text-white">{movie.genre}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Year</span>
                  <span className="text-white">{movie.year}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Popularity</span>
                  <span className="text-orange-400">{movie.popularity}%</span>
                </div>
              </div>
            </div>

            {/* Similar Movies Placeholder */}
            <div className="md:col-span-2 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">You Might Also Like</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {moviesData
                  .filter(m => m.id !== movie.id && m.genre === movie.genre)
                  .slice(0, 4)
                  .map((similarMovie) => (
                    <div
                      key={similarMovie.id}
                      onClick={() => router.push(`/movie/${similarMovie.id}`)}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[3/4] bg-gradient-to-br from-orange-500/20 to-orange-600/30 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-orange-500/30 transition-all duration-300">
                        <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium text-white mt-2 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                        {similarMovie.title}
                      </h4>
                      <p className="text-xs text-white/60">{similarMovie.year}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default MovieDetails
