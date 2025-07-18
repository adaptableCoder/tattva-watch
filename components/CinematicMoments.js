"use client"
import { useEffect, useRef } from 'react';

const CinematicMoments = () => {
  const scrollRef = useRef(null);

  const moments = [
    {
      quote: "Kyuki main udna chahta hun, daudna chahta hun, girna bhi chahta hun... bas rukna nahi chahta.",
      movie: "Yeh Jawaani Hai Deewani",
      theme: "Adventure & Dreams"
    },
    {
      quote: "Zindagi mein jab koi cheez chahiye hoti hai na, toh puri kainaat usse milane ki koshish mein lag jaati hai.",
      movie: "Om Shanti Om",
      theme: "Destiny & Hope"
    },
    {
      quote: "Haar ke jeetne waale ko baazigar kehte hain.",
      movie: "Baazigar",
      theme: "Determination"
    },
    {
      quote: "Pushpa, I hate tears.",
      movie: "Amar Prem",
      theme: "Love & Vulnerability"
    },
    {
      quote: "Mogambo khush hua!",
      movie: "Mr. India",
      theme: "Iconic Villains"
    },
    {
      quote: "Kuch kuch hota hai, tum nahi samjhoge.",
      movie: "Kuch Kuch Hota Hai",
      theme: "Unspoken Feelings"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const cardWidth = 280; // Approximate card width + gap
    const maxScroll = cardWidth * moments.length;

    const autoScroll = () => {
      scrollAmount += 0.5; // Slow scroll speed
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0; // Reset to beginning
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const interval = setInterval(autoScroll, 50); // Smooth 60fps scrolling

    // Pause on hover
    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => {
      const newInterval = setInterval(autoScroll, 50);
      return newInterval;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(interval);
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [moments.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]">Cinematic </span>
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Moments</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Timeless dialogues that capture the essence of human emotion
          </p>
        </div>

        {/* Auto-scroll Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide gap-6" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicate moments for infinite scroll effect */}
            {[...moments, ...moments].map((moment, index) => (
              <div
                key={index}
                className="flex-none w-64 group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-lg border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:scale-[1.02] hover:translate-y-[0.75rem] h-64">
                  {/* Background Gradient - Same for all cards */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 to-orange-600/12 group-hover:from-orange-500/15 group-hover:to-orange-600/20 transition-all duration-500"></div>
                  
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent group-hover:from-orange-500/[0.03] transition-all duration-500 rounded-2xl"></div>
                  
                  {/* Top Left Orange Gradient */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-transparent group-hover:from-orange-500/20 transition-all duration-500"></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_50px_rgba(249,115,22,0.15)] transition-shadow duration-500 rounded-2xl"></div>
                  
                  {/* Content */}
                  <div className="relative h-full p-5 flex flex-col justify-end z-10">
                    <div className="space-y-3">
                      {/* Quote */}
                      <blockquote className="text-sm font-medium text-white leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] italic line-clamp-3">
                        "{moment.quote}"
                      </blockquote>
                      
                      {/* Movie Title */}
                      <h3 className="text-lg font-bold text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)] group-hover:text-orange-400 transition-colors duration-300">
                        {moment.movie}
                      </h3>
                      
                      {/* Theme */}
                      <div className="inline-block px-2.5 py-1 bg-black/20 backdrop-blur-sm rounded-full text-xs text-orange-400 border border-orange-500/20 group-hover:bg-orange-500/10 group-hover:border-orange-500/40 group-hover:text-orange-300 transition-all duration-300">
                        {moment.theme}
                      </div>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute top-3 right-3 w-10 h-10 bg-orange-500/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-orange-500/30">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicMoments;
