import { useRouter } from 'next/navigation'

const MovieCard = ({ movie }) => {
  const router = useRouter()

  const handleAddToWatchlist = (e) => {
    e.stopPropagation() // Prevent card click when clicking watchlist button
    console.log(`Adding movie ${movie.id} to watchlist`)
    // Future: API call to add to watchlist
  }

  const handleCardClick = () => {
    router.push(`/movie/${movie.id}`)
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
      
      {/* Movie Poster Placeholder */}
      <div className="aspect-[3/4] bg-gradient-to-br from-orange-500/20 to-orange-600/30 flex items-center justify-center border-b border-white/10">
        <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2" />
        </svg>
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
      
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleAddToWatchlist}
          className="w-8 h-8 bg-orange-500/20 backdrop-blur-sm rounded-full border border-orange-500/30 flex items-center justify-center hover:bg-orange-500/30 transition-all duration-300"
          title="Add to Watchlist"
        >
          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MovieCard
