"use client"
import React, { useState, useEffect } from 'react'
import Button_arrows from './Button_arrows'

import { SignedOut, SignUp, useUser } from '@clerk/nextjs'

const HeroBanner = () => {
  const [showSignUp, setShowSignUp] = useState(false)
  const [poster, setPoster] = useState(null);

  // Fetch poster for Rocketry: The Nambi Effect
  useEffect(() => {
    const fetchMoviePoster = async () => {
      try {
        const response = await fetch(`/api/movies/search?q=${encodeURIComponent('Rocketry: The Nambi Effect')}`);
        const data = await response.json();
        if (data.success && data.data.results && data.data.results.length > 0) {
          const movie = data.data.results[0];
          setPoster(movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null);
        } else {
          setPoster(null);
        }
      } catch (error) {
        setPoster(null);
      }
    };
    fetchMoviePoster();
  }, []);
  const { isSignedIn } = useUser()

  useEffect(() => {
    // Only block scroll when user is signed out and modal is showing
    if (!isSignedIn && showSignUp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showSignUp, isSignedIn])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
      {/*SignUp Page - only shown when user is signed out*/}
      <SignedOut>
      <div className={`${showSignUp ? 'fixed' : 'hidden'} top-0 left-0 bg-black/70 flex items-center justify-center h-screen w-screen z-50`}>
        <button className="absolute top-4 right-8" onClick={() => setShowSignUp(false)}>
          <lord-icon
            src="https://cdn.lordicon.com/vgpkjbvw.json"
            trigger="hover"
            state="hover-cross-3"
            colors="primary:#e88c30"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
        </button>

        <SignUp routing='hash'/>
      </div>
      </SignedOut>

      {/* Animated Background with Orange Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-black to-orange-500/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50"></div>
        
        {/* Animated Orange Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/20 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-400/15 rounded-full animate-pulse blur-2xl"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-orange-600/25 rounded-full animate-pulse blur-lg"></div>
      </div>

      {/* Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
        {/* Hero Text */}
        <div className="text-white space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Discover Your Next</span>
            <span className="block text-orange-500 mt-2 drop-shadow-[0_0_20px_rgba(249,115,22,0.7)]">Favorite Film</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            Curated collections of must-watch movies, personalized recommendations, and the ultimate watchlist experience.
          </p>

          {/* CTA Button */}
          <button className="pt-4" onClick={() => setShowSignUp(true)}>
            <Button_arrows text="Start Exploring" />
          </button>

          {/* Stats */}
          <div className="pt-6">
            <div className="grid grid-cols-3 gap-4 max-w-sm">
              <div className="text-center bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                <div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">50K+</div>
                <div className="text-xs text-white/70 uppercase tracking-wide">Movies</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                <div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">10M+</div>
                <div className="text-xs text-white/70 uppercase tracking-wide">Users</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                <div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">4.9★</div>
                <div className="text-xs text-white/70 uppercase tracking-wide">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Movie Card - Rocketry: The Nambi Effect */}
        <div className="hidden lg:block">
          <div className="relative group max-w-sm mx-auto">
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(249,115,22,0.3)] transition-all duration-500 hover:scale-105">
              {/* Movie Poster */}
              <div className="aspect-[3/4] rounded-xl mb-4 border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.2)] overflow-hidden bg-black flex items-center justify-center">
                {poster ? (
                  <img
                    src={poster}
                    alt="Rocketry: The Nambi Effect Poster"
                    className="w-full h-full object-cover object-center max-h-[340px]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40 text-lg">No Poster</div>
                )}
              </div>
              {/* Movie Info */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Rocketry: The Nambi Effect</h3>
                <p className="text-orange-500 font-semibold text-sm drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">★ 8.7 IMDb</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
          <svg className="w-4 h-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner