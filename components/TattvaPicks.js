const TattvaPicks = () => {
  const picks = [
    {
      theme: "Self Discovery",
      title: "Tamasha",
      subtitle: "Finding yourself in chaos",
      size: "row-span-2 col-span-1"
    },
    {
      theme: "Stillness",
      title: "Masaan",
      subtitle: "Peace in acceptance",
      size: "row-span-1 col-span-2"
    },
    {
      theme: "Joy",
      title: "Barfi",
      subtitle: "Love without words",
      size: "row-span-1 col-span-1"
    },
    {
      theme: "Melancholy",
      title: "October",
      subtitle: "Gentle farewells",
      size: "row-span-1 col-span-1"
    },
    {
      theme: "Wonder",
      title: "Zindagi Na Milegi Dobara",
      subtitle: "Life's adventures",
      size: "row-span-2 col-span-1"
    },
    {
      theme: "Courage",
      title: "Dangal",
      subtitle: "Breaking barriers",
      size: "row-span-1 col-span-1"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]">Tattva</span>
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"> Picks</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Curated films that speak to different states of being
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {picks.map((pick, index) => (
            <div
              key={index}
              className={`${pick.size} group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer`}
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl"></div>
              
              {/* Default Gradient - Bottom Right Corner */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-500/20 group-hover:opacity-0 transition-opacity duration-500"></div>
              
              {/* Subtle Orange Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-orange-400/10 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                {/* Top Section with Theme Badge */}
                <div className="flex justify-between items-start">
                  <div className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-orange-500 group-hover:text-white border border-orange-500/30 shadow-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
                    {pick.theme}
                  </div>
                  
                  {/* Hover Play Icon */}
                  <div className="w-8 h-8 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20 hover:border-orange-500/40">
                    <svg className="w-4 h-4 text-white/80 group-hover:text-orange-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Bottom Section with Title and Subtitle */}
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:text-orange-500 transition-colors duration-300">
                    {pick.title}
                  </h3>
                  
                  <p className="text-sm text-white/70 leading-relaxed">
                    {pick.subtitle}
                  </p>
                  
                  {/* Bottom Accent Line */}
                  <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent group-hover:from-orange-500 group-hover:w-24 transition-all duration-500"></div>
                </div>
              </div>

              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_20px_rgba(249,115,22,0.1)] transition-all duration-500 rounded-2xl"></div>
              
              {/* Outer Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/20 group-hover:via-orange-500/5 group-hover:to-orange-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TattvaPicks;
