"use client"
import { useState, useEffect } from 'react'
import { watchlistAPI } from '@/hooks/useWatchlist'

const WatchlistSection = ({ user }) => {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [removingId, setRemovingId] = useState(null)

  // Load watchlist from MongoDB when component mounts
  useEffect(() => {
    if (user) {
      setLoading(true)
      watchlistAPI.get().then(data => {
        setWatchlist(data || [])
        setLoading(false)
      }).catch(error => {
        console.error('Error loading watchlist:', error)
        setWatchlist([])
        setLoading(false)
      })
    }
  }, [user])

  // Remove movie from watchlist
  const handleRemoveFromWatchlist = async (movieId) => {
    setRemovingId(movieId)
    const success = await watchlistAPI.remove(movieId)
    if (success) {
      setWatchlist(prev => prev.filter(item => item.movieId !== movieId))
    }
    setRemovingId(null)
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]">My </span>
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Watchlist</span>
          </h2>
          
          {/* User Info */}
          <div className="mb-8">
            <p className="text-white/60 text-sm">
              Your curated collection, {user?.firstName || 'Movie Enthusiast'}
            </p>
            <p className="text-orange-500 text-sm font-medium mt-1">
              {watchlist.length} movies saved
            </p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/60">Loading your watchlist...</p>
          </div>
        ) : watchlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h3>
            <p className="text-white/60 mb-6">Start exploring movies and add them to your watchlist</p>
            <a
              href="/explore"
              className="inline-flex items-center px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-full border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300"
            >
              Explore Movies
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {watchlist.map((item) => {
              const movie = item.movieData
              const isRemoving = removingId === item.movieId
              
              return (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-lg border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:scale-105"
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 to-orange-600/12 group-hover:from-orange-500/15 group-hover:to-orange-600/20 transition-all duration-500"></div>
                  
                  {/* Top Left Orange Gradient */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-orange-500/10 to-transparent group-hover:from-orange-500/20 transition-all duration-500"></div>
                  
                  {/* Movie Poster */}
                  <div className="aspect-[3/4] border-b border-white/10 overflow-hidden">
                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    {/* Fallback placeholder */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/30 flex items-center justify-center ${movie.poster ? 'hidden' : 'flex'}`}>
                      <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Movie Info */}
                  <div className="relative z-10 p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                      {movie.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60">{movie.year}</span>
                      <span className="text-orange-500 font-medium">★ {movie.rating}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-1 bg-black/30 rounded-full text-orange-400 border border-orange-500/20">
                        {movie.genre}
                      </span>
                    </div>
                    
                    <div className="text-xs text-white/50">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleRemoveFromWatchlist(item.movieId)}
                      disabled={isRemoving}
                      className="w-8 h-8 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition-all duration-300 disabled:opacity-50"
                    >
                      {isRemoving ? (
                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default WatchlistSection
