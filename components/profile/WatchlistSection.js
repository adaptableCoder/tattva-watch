"use client"
import { useState } from 'react'

const WatchlistSection = ({ user }) => {
  const [activeTab, setActiveTab] = useState('watchlist')
  
  // Mock data - in real app, this would come from a database linked to user ID
  const userId = user?.id
  
  const watchlistMovies = [
    {
      id: 1,
      title: "Inception",
      year: "2010",
      genre: "Sci-Fi",
      rating: "8.8",
      poster: "/api/placeholder/300/450",
      addedDate: "2 days ago",
      userId: userId
    },
    {
      id: 2,
      title: "The Dark Knight",
      year: "2008",
      genre: "Action",
      rating: "9.0",
      poster: "/api/placeholder/300/450",
      addedDate: "1 week ago",
      userId: userId
    },
    {
      id: 3,
      title: "Interstellar",
      year: "2014",
      genre: "Sci-Fi",
      rating: "8.6",
      poster: "/api/placeholder/300/450",
      addedDate: "2 weeks ago",
      userId: userId
    },
    {
      id: 4,
      title: "Parasite",
      year: "2019",
      genre: "Thriller",
      rating: "8.6",
      poster: "/api/placeholder/300/450",
      addedDate: "3 weeks ago",
      userId: userId
    },
    {
      id: 5,
      title: "Pulp Fiction",
      year: "1994",
      genre: "Crime",
      rating: "8.9",
      poster: "/api/placeholder/300/450",
      addedDate: "1 month ago",
      userId: userId
    },
    {
      id: 6,
      title: "The Godfather",
      year: "1972",
      genre: "Crime",
      rating: "9.2",
      poster: "/api/placeholder/300/450",
      addedDate: "1 month ago",
      userId: userId
    }
  ]

  const watchedMovies = [
    {
      id: 7,
      title: "Avengers: Endgame",
      year: "2019",
      genre: "Action",
      rating: "8.4",
      poster: "/api/placeholder/300/450",
      watchedDate: "3 days ago",
      userRating: "9.0",
      userId: userId
    },
    {
      id: 8,
      title: "Joker",
      year: "2019",
      genre: "Drama",
      rating: "8.4",
      poster: "/api/placeholder/300/450",
      watchedDate: "1 week ago",
      userRating: "8.5",
      userId: userId
    },
    {
      id: 9,
      title: "1917",
      year: "2019",
      genre: "War",
      rating: "8.3",
      poster: "/api/placeholder/300/450",
      watchedDate: "2 weeks ago",
      userRating: "9.2",
      userId: userId
    }
  ]

  const removeFromWatchlist = (movieId) => {
    // Frontend only - would connect to backend later
    console.log(`User ${userId} removing movie ${movieId} from watchlist`)
    // Here you would make an API call to remove from database
  }

  const addToWatchlist = (movieId) => {
    // Frontend only - would connect to backend later
    console.log(`User ${userId} adding movie ${movieId} to watchlist`)
    // Here you would make an API call to add to database
  }

  return (
    <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]">My </span>
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Cinema</span>
          </h2>
          
          {/* User Info */}
          <div className="mb-8">
            <p className="text-white/60 text-sm">
              Curated collection for {user?.firstName || 'Movie Enthusiast'}
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/30 backdrop-blur-lg rounded-full border border-white/10 p-2 flex space-x-4">
              <button
                onClick={() => setActiveTab('watchlist')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'watchlist'
                    ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Watchlist ({watchlistMovies.length})
              </button>
              <button
                onClick={() => setActiveTab('watched')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'watched'
                    ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Watched ({watchedMovies.length})
              </button>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {(activeTab === 'watchlist' ? watchlistMovies : watchedMovies).map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-lg border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:scale-105"
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
                  {movie.userRating && (
                    <span className="text-white/60">You: ★ {movie.userRating}</span>
                  )}
                </div>
                
                <div className="text-xs text-white/50">
                  {activeTab === 'watchlist' ? `Added ${movie.addedDate}` : `Watched ${movie.watchedDate}`}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {activeTab === 'watchlist' ? (
                  <button
                    onClick={() => removeFromWatchlist(movie.id)}
                    className="w-8 h-8 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => addToWatchlist(movie.id)}
                    className="w-8 h-8 bg-orange-500/20 backdrop-blur-sm rounded-full border border-orange-500/30 flex items-center justify-center hover:bg-orange-500/30 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WatchlistSection
