"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const [showSignin, setShowSignin] = useState(false)

  useEffect(() => {
    if (showSignin) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showSignin])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      {/* SignIn Modal - Only show when signed out */}
      <SignedOut>
        <div className={`${showSignin ? 'fixed' : 'hidden'} top-0 left-0 bg-black/70 flex items-center justify-center h-screen w-screen z-1`}>
          <button 
            className="absolute top-8 right-8 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-full transition-all duration-200 border border-orange-500/30 hover:border-orange-500/50 h-12 w-12 flex items-center justify-center" 
            onClick={() => setShowSignin(false)}
          >
            <lord-icon
              src="https://cdn.lordicon.com/cyxagjmd.json"
              trigger="hover"
              state="hover-pinch"
              stroke="bold"
              colors="primary:#ff6900">
            </lord-icon>
          </button>

          <SignIn routing='hash' fallbackRedirectUrl='/profile'/>
        </div>
      </SignedOut>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              <span className="text-orange-500">Tattva</span>Watch
            </Link>
          </div>

          {/* Navigation Links & Profile */}
          <div className="flex items-center space-x-4">
            {/* Signed In Navigation */}
            <SignedIn>
              <div className="hidden lg:flex items-center space-x-6">
                <Link href="/explore" className="text-white/80 hover:text-orange-500 transition-colors duration-200">
                  Explore
                </Link>
              </div>
              
              {/* User Button */}
              <div className="flex items-center">
                <UserButton 
                  userProfileMode="navigation"
                  userProfileUrl="/profile"
                />
              </div>
            </SignedIn>

            {/* Signed Out Navigation */}
            <SignedOut>
              {/* Sign In Button */}
              <button 
                className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 px-4 py-2 rounded-full transition-all duration-200 border border-orange-500/30 hover:border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] cursor-pointer flex items-center" 
                onClick={() => setShowSignin(true)}
              >
                <span className="hidden sm:inline">Sign In</span>
                <lord-icon
                  src="https://cdn.lordicon.com/atnzlgcx.json"
                  trigger="hover"
                  colors="primary:#ff6900"
                  style={{ "width": "1.5rem", "height": "1.5rem" }}>
                </lord-icon>
              </button>
            </SignedOut>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white/80 hover:text-orange-500 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
