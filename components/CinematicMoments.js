"use client"
import { useEffect, useState, useRef } from 'react';

const CinematicMoments = () => {
  const [momentsWithPosters, setMomentsWithPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

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

  // Simple function to fetch movie poster from TMDB API
  const fetchMoviePoster = async (movieTitle) => {
    try {
      const response = await fetch(`/api/movies/search?q=${encodeURIComponent(movieTitle)}`);
      const data = await response.json();
      
      if (data.success && data.data.results && data.data.results.length > 0) {
        const movie = data.data.results[0];
        return movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching poster for ${movieTitle}:`, error);
      return null;
    }
  };

  // Fetch posters for all movies
  useEffect(() => {
    const fetchAllPosters = async () => {
      setLoading(true);
      const momentsWithPosters = await Promise.all(
        moments.map(async (moment) => {
          const poster = await fetchMoviePoster(moment.movie);
          return { ...moment, poster };
        })
      );
      setMomentsWithPosters(momentsWithPosters);
      setLoading(false);
    };

    fetchAllPosters();
  }, []);

  // Simple auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || loading) return;

    const scrollInterval = setInterval(() => {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollContainer.scrollLeft >= maxScrollLeft) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    }, 80);

    return () => clearInterval(scrollInterval);
  }, [loading]);

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

        {/* Simple Grid Container */}
        <div className="relative">
          {loading ? (
            // Loading skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white/5 rounded-2xl h-64 p-6">
                    <div className="h-4 bg-white/10 rounded w-full mb-4"></div>
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
                    <div className="h-5 bg-white/10 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {momentsWithPosters.map((moment, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 h-64">
                    {/* Movie Poster Background */}
                    {moment.poster && (
                      <div className="absolute inset-0">
                        <img
                          src={moment.poster}
                          alt={moment.movie}
                          className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="relative h-full p-6 flex flex-col justify-end">
                      <div className="space-y-3">
                        {/* Quote */}
                        <blockquote className="text-sm text-white leading-relaxed italic">
                          &ldquo;{moment.quote}&rdquo;
                        </blockquote>
                        
                        {/* Movie Title */}
                        <h3 className="text-lg font-bold text-orange-500">
                          {moment.movie}
                        </h3>
                        
                        {/* Theme */}
                        <div className="inline-block px-3 py-1 bg-orange-500/20 rounded-full text-xs text-orange-400">
                          {moment.theme}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CinematicMoments;