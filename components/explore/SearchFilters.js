const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery,
  loading = false
}) => {

  return (
    <section className="px-4 sm:px-6 lg:px-8 my-8">
        <div className="relative max-w-3xl mx-auto">
          <input
            type="text"
            placeholder={'Search movies, directors, actors...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 pr-12 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-orange-500/50 focus:bg-white/15 transition-all duration-200 disabled:opacity-50"
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
    </section>
  )
}

export default SearchFilters
