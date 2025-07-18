// components/explore/ExploreHero.js
const ExploreHero = () => {
  return (
    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Explore </span>
            <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.7)]">Movies</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover your next favorite film from our curated collection
          </p>
        </div>
      </div>
    </section>
  )
}

export default ExploreHero
