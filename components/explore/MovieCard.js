import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { watchlistAPI, isInWatchlist } from '@/hooks/useWatchlist'

const MovieCard = ({ movie, isHomePage = false }) => {
  const router = useRouter()
  const { isSignedIn } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [watchlist, setWatchlist] = useState([])
  const [inWatchlist, setInWatchlist] = useState(false)

  // Only check watchlist status if user is signed in AND not on home page
  useEffect(() => {
    if (isSignedIn && !isHomePage) {
      watchlistAPI.get().then(data => {
        setWatchlist(data)
        setInWatchlist(isInWatchlist(data, movie.id))
      })
    }
  }, [isSignedIn, movie.id, isHomePage])

  const handleCardClick = () => {
    // On home page, redirect to sign-in for movie details
    if (isHomePage && !isSignedIn) {
      router.push('/sign-in')
      return
    }
    router.push(`/movie/${movie.id}`)
  }

  const handleWatchlistClick = async (e) => {
    e.stopPropagation()
    
    // Always redirect to sign-in if not authenticated
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    
    setIsLoading(true)
    
    if (inWatchlist) {
      const success = await watchlistAPI.remove(movie.id)
      if (success) setInWatchlist(false)
    } else {
      const success = await watchlistAPI.add(movie)
      if (success) setInWatchlist(true)
    }
    
    setIsLoading(false)
  }

  return (
    <div 
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-lg border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:scale-105 cursor-pointer"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 to-orange-600/12 group-hover:from-orange-500/15 group-hover:to-orange-600/20 transition-all duration-500"></div>
      
      {/* Top Left Orange Gradient */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-orange-500/10 to-transparent group-hover:from-orange-500/20 transition-all duration-500"></div>
      
      {/* Movie Poster */}
      <div className="aspect-[3/4] relative border-b border-white/10 overflow-hidden">
        {/* Watchlist Button */}
        <button
          onClick={handleWatchlistClick}
          disabled={isLoading}
          title={!isSignedIn ? "Sign in to add to watchlist" : inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
            inWatchlist 
              ? 'bg-orange-500/20 border-orange-500/50 text-orange-500 hover:bg-orange-500/30' 
              : 'bg-black/20 border-white/20 text-white/60 hover:bg-black/30 hover:border-white/30'
          }`}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : inWatchlist ? (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          )}
        </button>

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
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/30 flex items-center justify-center ${movie.poster ? 'hidden' : 'flex'}`}
        >
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
          <span className="text-white/60">{movie.duration}</span>
        </div>
        
        <p className="text-xs text-white/50 line-clamp-2">
          {movie.description}
        </p>

        <div className="text-xs text-white/60">
          Dir: {movie.director}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
