"use client"
import React, { useState, useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { movieApi, movieUtils } from '@/lib/api'
import { watchlistAPI, isInWatchlist } from '@/hooks/useWatchlist'

const MovieDetails = () => {
  const params = useParams()
  const router = useRouter()
  const { isSignedIn, user } = useUser()
  const [isWatchlistAdded, setIsWatchlistAdded] = useState(false)
  const [watchlistLoading, setWatchlistLoading] = useState(false)
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const movieData = await movieApi.getDetails(params.id)
        
        // Transform the movie data
        const transformedMovie = {
          id: movieData.id,
          title: movieData.title,
          year: movieUtils.getYear(movieData.release_date),
          genre: movieData.genres?.[0]?.name || 'Unknown',
          rating: movieData.vote_average ? movieData.vote_average.toFixed(1) : 'N/A',
          poster: movieUtils.getPosterUrl(movieData.poster_path),
          backdrop: movieUtils.getBackdropUrl(movieData.backdrop_path),
          description: movieData.overview || 'No description available.',
          director: movieData.credits?.crew?.find(person => person.job === 'Director')?.name || 'Unknown',
          cast: movieData.credits?.cast?.slice(0, 5).map(actor => actor.name) || [],
          duration: movieData.runtime ? movieUtils.formatDuration(movieData.runtime) : 'Unknown',
          popularity: movieData.popularity ? Math.round(movieData.popularity) : 0,
          releaseDate: movieData.release_date,
          voteCount: movieData.vote_count,
          genres: movieData.genres || [],
          similar: movieData.similar?.results?.slice(0, 8) || []
        }
        
        setMovie(transformedMovie)
        
        // Check if movie is in watchlist (only if user is signed in)
        if (isSignedIn) {
          const watchlist = await watchlistAPI.get()
          setIsWatchlistAdded(isInWatchlist(watchlist, transformedMovie.id))
        }
        
      } catch (error) {
        console.error('Failed to fetch movie details:', error)
        setError('Failed to load movie details')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchMovieDetails()
    }
  }, [params.id])

  // Loading state
  if (loading) {
    return (
      <>
        <main className="min-h-screen bg-[#0B0B0F] text-white">
          <Navbar />
          <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-white/10 rounded w-24 mb-8"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-1">
                    <div className="aspect-[3/4] bg-white/10 rounded-2xl"></div>
                  </div>
                  <div className="lg:col-span-2 space-y-6">
                    <div className="h-12 bg-white/10 rounded w-3/4"></div>
                    <div className="h-6 bg-white/10 rounded w-1/2"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-white/10 rounded"></div>
                      <div className="h-4 bg-white/10 rounded w-5/6"></div>
                      <div className="h-4 bg-white/10 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </>
    )
  }

  // Error state
  if (error || !movie) {
    return (
      <>
        <main className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
            <p className="text-white/60 mb-6">{error || 'The requested movie could not be found.'}</p>
            <button 
              onClick={() => router.push('/explore')}
              className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-full border border-orange-500/30 transition-all duration-300"
            >
              Back to Explore
            </button>
          </div>
        </main>
      </>
    )
  }

  const handleAddToWatchlist = async () => {
    // Redirect to sign-in if not authenticated
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    
    setWatchlistLoading(true)
    
    try {
      if (isWatchlistAdded) {
        // Remove from watchlist
        const success = await watchlistAPI.remove(movie.id)
        if (success) {
          setIsWatchlistAdded(false)
          console.log(`Removed from watchlist: ${movie.title}`)
        }
      } else {
        // Add to watchlist
        const success = await watchlistAPI.add(movie)
        if (success) {
          setIsWatchlistAdded(true)
          console.log(`Added to watchlist: ${movie.title}`)
        }
      }
    } catch (error) {
      console.error('Watchlist error:', error)
    } finally {
      setWatchlistLoading(false)
    }
  }

  return (
    <>
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
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  {/* Fallback placeholder */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/30 flex items-center justify-center ${movie.poster ? 'hidden' : 'flex'}`}
                  >
                    <svg className="w-24 h-24 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2" />
                    </svg>
                  </div>
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
                    disabled={watchlistLoading}
                    title={!isSignedIn ? "Sign in to add to watchlist" : ""}
                    className={`px-8 py-3 rounded-full border transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                      isWatchlistAdded
                        ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600'
                        : 'bg-orange-500/20 text-orange-500 border-orange-500/30 hover:bg-orange-500/30'
                    }`}
                  >
                    {watchlistLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        {isWatchlistAdded ? 'Removing...' : 'Adding...'}
                      </div>
                    ) : !isSignedIn ? (
                      'Sign in to Add to Watchlist'
                    ) : (
                      isWatchlistAdded ? 'Remove from Watchlist' : 'Add to Watchlist'
                    )}
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

              {/* Similar Movies */}
              <div className="md:col-span-2 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4">You Might Also Like</h3>
                {movie.similar.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {movie.similar.map((similarMovie) => (
                      <div
                        key={similarMovie.id}
                        onClick={() => router.push(`/movie/${similarMovie.id}`)}
                        className="group cursor-pointer"
                      >
                        <div className="aspect-[3/4] relative rounded-lg overflow-hidden border border-white/10 group-hover:border-orange-500/30 transition-all duration-300">
                          {similarMovie.poster_path ? (
                            <img
                              src={movieUtils.getPosterUrl(similarMovie.poster_path, 'w300')}
                              alt={similarMovie.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                          ) : null}
                          {/* Fallback placeholder */}
                          <div 
                            className={`absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/30 flex items-center justify-center ${similarMovie.poster_path ? 'hidden' : 'flex'}`}
                          >
                            <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2" />
                            </svg>
                          </div>
                        </div>
                        <h4 className="text-sm font-medium text-white mt-2 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                          {similarMovie.title}
                        </h4>
                        <p className="text-xs text-white/60">{movieUtils.getYear(similarMovie.release_date)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60 text-center py-8">No similar movies found</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

export default MovieDetails
