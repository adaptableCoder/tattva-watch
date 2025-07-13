const BehindTheScenes = () => {
  const stories = [
    {
      quote: "The entire song 'Ik Junoon' was shot in a single take. Ranveer's energy was so infectious that the crew forgot they were working.",
      movie: "Zindagi Na Milegi Dobara",
      person: "Zoya Akhtar",
      role: "Director",
      type: "Director's Cut"
    },
    {
      quote: "Aamir spent 6 months learning wrestling techniques. His dedication inspired the entire cast to push their limits.",
      movie: "Dangal",
      person: "Nitesh Tiwari",
      role: "Director",
      type: "Behind Camera"
    },
    {
      quote: "The rain scene in 'Barfi' wasn't planned. It started raining during the shoot, and Ranbir improvised beautifully.",
      movie: "Barfi!",
      person: "Anurag Basu",
      role: "Director",
      type: "Happy Accidents"
    },
    {
      quote: "Irrfan would often break character and share philosophical thoughts between takes. Those moments were pure magic.",
      movie: "The Lunchbox",
      person: "Ritesh Batra",
      role: "Director", 
      type: "Actor's Method"
    },
    {
      quote: "The entire climax of 'Tumhari Sulu' was rewritten after Vidya's improvisation during a rehearsal. Spontaneity at its best.",
      movie: "Tumhari Sulu",
      person: "Suresh Triveni",
      role: "Director",
      type: "Creative Process"
    },
    {
      quote: "Rajkummar lived in Delhi slums for 2 weeks to understand his character. His commitment redefined method acting for us.",
      movie: "Newton",
      person: "Amit Masurkar",
      role: "Director",
      type: "Character Study"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Behind The </span>
            <span className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]">Scenes</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Untold stories, creative process, and the magic that happens when cameras stop rolling
          </p>
        </div>

        {/* Circular Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <div
              key={index}
              className="group relative flex justify-center"
            >
              {/* Circular Card */}
              <div className="relative w-80 h-80 rounded-full bg-black/30 backdrop-blur-lg border border-white/5 hover:border-amber-500/40 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-radial from-amber-500/8 via-amber-600/5 to-transparent group-hover:from-amber-500/15 group-hover:via-amber-600/10 transition-all duration-500 rounded-full"></div>
                
                {/* Pulse Ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 shadow-[0_0_40px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_60px_rgba(245,158,11,0.3)] transition-shadow duration-500 rounded-full"></div>
                
                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-center items-center text-center z-10">
                  {/* Story Type Icon */}
                  <div className="mb-4 w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30 group-hover:bg-amber-500/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-white/90 text-sm leading-relaxed italic mb-4 line-clamp-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    "{story.quote}"
                  </blockquote>
                  
                  {/* Movie Title */}
                  <h3 className="text-lg font-bold text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] group-hover:text-amber-400 transition-colors duration-300 mb-2">
                    {story.movie}
                  </h3>
                  
                  {/* Attribution */}
                  <div className="text-center">
                    <p className="text-white/80 text-sm font-medium">{story.person}</p>
                    <p className="text-amber-500/80 text-xs">{story.role}</p>
                  </div>
                  
                  {/* Story Type Badge */}
                  <div className="mt-3 px-3 py-1 bg-amber-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-amber-400 border border-amber-500/30">
                    {story.type}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 px-8 py-4 rounded-full transition-all duration-300 border border-amber-500/30 hover:border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] backdrop-blur-sm" >
            <span className="flex items-center space-x-3">
              <span className="font-medium">Discover More Stories</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BehindTheScenes;
