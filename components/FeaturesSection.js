const FeaturesSection = () => {
  const features = [
    {
      emoji: "🎭",
      title: "Mood Explorer",
      description: "Find films that match your current emotional state",
      details: "Joyful • Contemplative • Intense • Peaceful"
    },
    {
      emoji: "🧘",
      title: "Watch with Intention",
      description: "Choose films based on time you have available",
      details: "30min • 1hr • 2hrs • Epic Journey"
    },
    {
      emoji: "🕰️",
      title: "Tattva Time Machine",
      description: "Journey through cinema across different eras",
      details: "80s Classics • 90s Gems • 2010s Hits • Modern Tales"
    },
    {
      emoji: "🧑‍🤝‍🧑",
      title: "Watch With...",
      description: "Curated lists for shared viewing experiences",
      details: "Date Night • Family Time • Friends • Solo Soul"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Discover </span>
            <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]">Your Way</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Four unique pathways to find the perfect film for your moment
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-lg border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer p-6"
            >
              {/* Background Gradient - Same for all cards */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 to-orange-600/12 group-hover:from-orange-500/15 group-hover:to-orange-600/20 transition-all duration-500"></div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_50px_rgba(249,115,22,0.15)] transition-shadow duration-500 rounded-3xl"></div>
              
              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent group-hover:from-orange-500/[0.03] transition-all duration-500 rounded-3xl"></div>
              
              {/* Bottom Right Orange Gradient - Same for all cards */}
              <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-orange-500/10 to-transparent group-hover:from-orange-500/20 transition-all duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Emoji Icon */}
                <div className="text-5xl mb-3 drop-shadow-[0_0_25px_rgba(249,115,22,0.3)] group-hover:scale-110 group-hover:drop-shadow-[0_0_35px_rgba(249,115,22,0.5)] transition-all duration-300">
                  {feature.emoji}
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:text-orange-500 group-hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/80 text-base leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Details */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {feature.details.split(' • ').map((detail, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-black/20 backdrop-blur-sm rounded-full text-xs text-orange-400 border border-orange-500/20 group-hover:bg-orange-500/10 group-hover:border-orange-500/40 group-hover:text-orange-300 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all duration-300"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
