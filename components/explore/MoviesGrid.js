import MovieCard from './MovieCard'

const MoviesGrid = ({ 
  movies, 
  onClearFilters 
}) => {
  if (movies.length === 0) {
    return (
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* No Results */}
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/30">
              <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No movies found</h3>
            <p className="text-white/60 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={onClearFilters}
              className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-full border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MoviesGrid
