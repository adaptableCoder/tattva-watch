"use client"
import { useState, useEffect } from 'react';

const TattvaPicks = () => {
  const [picksWithPosters, setPicksWithPosters] = useState([]);
  const [loading, setLoading] = useState(true);

  const picks = [
    {
      theme: "Spirituality",
      title: "Guide",
      subtitle: "Journey of transformation",
      size: "row-span-2 col-span-1"
    },
    {
      theme: "Artistry",
      title: "Kagaz Ke Phool",
      subtitle: "Dreams and reality",
      size: "row-span-1 col-span-2"
    },
    {
      theme: "Valor",
      title: "Chaar Sahibzaade",
      subtitle: "Courage of the young",
      size: "row-span-2 col-span-1"
    },
    {
      theme: "Melancholy",
      title: "Mera Naam Joker",
      subtitle: "Laughter through tears",
      size: "row-span-2 col-span-1"
    },
    {
      theme: "Innocence",
      title: "The Little Prince",
      subtitle: "Childlike wonder",
      size: "row-span-1 col-span-1"
    },
    {
      theme: "Environment",
      title: "Kadvi Hawa",
      subtitle: "Nature's awakening",
      size: "row-span-1 col-span-1"
    },
    {
      theme: "Sacrifice",
      title: "Mother India",
      subtitle: "A mother's eternal love",
      size: "row-span-2 col-span-1"
    },
    {
      theme: "Education",
      title: "3 Idiots",
      subtitle: "Learning with joy",
      size: "row-span-2 col-span-1"
    },
    {
      theme: "Revolution",
      title: "Rang De Basanti",
      subtitle: "Youth awakening",
      size: "row-span-1 col-span-2"
    },
  ];

  // Simple function to fetch movie poster from TMDB API
  const fetchMoviePoster = async (movieTitle) => {
    try {
      const response = await fetch(`/api/movies/search?q=${encodeURIComponent(movieTitle)}`);
      const data = await response.json();
      
      if (data.success && data.data.results && data.data.results.length > 0) {
        // For Mother India, take the 2nd result (index 1)
        const movieIndex = movieTitle === "Mother India" ? 1 : 0;
        const movie = data.data.results[movieIndex] || data.data.results[0];
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
      const picksWithPosters = await Promise.all(
        picks.map(async (pick) => {
          const poster = await fetchMoviePoster(pick.title);
          return { ...pick, poster };
        })
      );
      setPicksWithPosters(picksWithPosters);
      setLoading(false);
    };

    fetchAllPosters();
  }, []);

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto grid-rows-4 md:grid-rows-3">
          {loading ? (
            // Loading skeletons
            Array(10).fill(0).map((_, index) => (
              <div
                key={index}
                className={`${picks[index]?.size || "row-span-1 col-span-1"} relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 animate-pulse`}
              >
                <div className="h-full p-6 flex flex-col justify-between">
                  <div className="h-6 bg-white/10 rounded w-20"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-white/10 rounded w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            picksWithPosters.map((pick, index) => (
              <div
                key={index}
                className={`${pick.size} group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer`}
              >
                {/* Movie Poster Background */}
                {pick.poster && (
                  <div className="absolute inset-0">
                    <img
                      src={pick.poster}
                      alt={pick.title}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>
                )}
                
                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between">
                  {/* Theme Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-orange-500 border border-orange-500/30 w-fit">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    {pick.theme}
                  </div>
                  
                  {/* Title and Subtitle */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-orange-500 transition-colors duration-300">
                      {pick.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      {pick.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TattvaPicks;
