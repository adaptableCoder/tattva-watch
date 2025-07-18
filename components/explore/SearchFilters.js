const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery,
  totalMovies,
  filteredCount,
  loading = false
}) => {


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
                className="w-full px-4 py-3 pl-12 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500/50 focus:bg-white/15 transition-all duration-200 disabled:opacity-50"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {/* Loading indicator */}
              {loading && searchQuery && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                </div>
              )}
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
