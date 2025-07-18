"use client"
import React, { useState } from 'react'

import { useUser } from '@clerk/nextjs'
import { SignIn } from '@clerk/nextjs'

import Navbar from '@/components/Navbar'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileStats from '@/components/profile/ProfileStats'
import WatchlistSection from '@/components/profile/WatchlistSection'
import Footer from '@/components/Footer'

const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [showSignIn, setShowSignIn] = useState(false)

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading profile...</p>
        </div>
      </main>
    )
  }

  // Show SignIn modal if not authenticated
  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-[#0B0B0F] text-white">
        <Navbar />
        
        {/* Auth Required Message */}
        <div className="pt-16 min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-black/30 backdrop-blur-lg rounded-3xl border border-white/10 p-8 mb-8">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/30">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">Sign In </span>
                <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Required</span>
              </h2>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                Access your personalized profile, watchlist, and cinema journey. Join the TattvaWatch community today!
              </p>
              
              <button 
                onClick={() => setShowSignIn(true)}
                className="px-8 py-4 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-full border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] font-medium"
              >
                Sign In to Continue
              </button>
            </div>
          </div>
        </div>

        {/* SignIn Modal */}
        {showSignIn && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl border border-white/20 p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setShowSignIn(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* SignIn Component */}
              <div className="mt-4">
                <SignIn 
                  routing="hash"
                  fallbackRedirectUrl="/profile"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none border-none",
                      headerTitle: "text-white text-2xl font-bold",
                      headerSubtitle: "text-white/70",
                      socialButtonsBlockButton: "bg-white/10 border border-white/20 text-white hover:bg-white/20",
                      formFieldInput: "bg-white/10 border border-white/20 text-white placeholder-white/50",
                      formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white border-none shadow-[0_0_20px_rgba(249,115,22,0.3)]",
                      footerActionLink: "text-orange-500 hover:text-orange-400",
                      identityPreviewText: "text-white",
                      formFieldLabel: "text-white/80"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white">
      <Navbar />
      
      <div className="pt-16">
        <ProfileHeader user={user} />
        <ProfileStats user={user} />
        <WatchlistSection user={user} />
      </div>
      
      <Footer />
    </main>
  )
}

export default Profile