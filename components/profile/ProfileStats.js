const ProfileStats = ({ user }) => {
  // Calculate user tenure
  const joinDate = user?.createdAt ? new Date(user.createdAt) : new Date()
  const monthsSinceJoined = Math.floor((new Date() - joinDate) / (1000 * 60 * 60 * 24 * 30))
  
  // Generate stats based on user tenure (mock data for demo)
  const baseMovies = Math.max(50, monthsSinceJoined * 12)
  const baseWatchlist = Math.max(5, Math.floor(monthsSinceJoined * 2))

  const stats = [
    {
      label: "Movies Watched",
      value: baseMovies.toString(),
      icon: "🎬",
      trend: `+${Math.floor(baseMovies * 0.05)} this month`
    },
    {
      label: "Watchlist",
      value: baseWatchlist.toString(),
      icon: "📝",
      trend: `+${Math.floor(baseWatchlist * 0.1)} this week`
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto">
        {/* User Journey Info */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <p className="text-white/70">
              Member since {joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              <span className="text-orange-500 font-medium ml-2">
                • {monthsSinceJoined} months of cinematic journey
              </span>
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-lg border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:scale-105 p-6"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 to-orange-600/12 group-hover:from-orange-500/15 group-hover:to-orange-600/20 transition-all duration-500"></div>
              
              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent group-hover:from-orange-500/[0.03] transition-all duration-500 rounded-2xl"></div>
              
              {/* Top Left Orange Gradient */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-orange-500/10 to-transparent group-hover:from-orange-500/20 transition-all duration-500"></div>
              
              <div className="relative z-10 text-center">
                <div className="text-3xl mb-2 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80 font-medium mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-orange-400 font-medium">
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProfileStats
