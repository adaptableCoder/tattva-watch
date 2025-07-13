"use client"
import { useState } from 'react'
import { UserProfile } from '@clerk/nextjs'

const ProfileHeader = ({ user }) => {
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [bioText, setBioText] = useState("Every frame tells a story, every story touches a soul. Welcome to my cinematic journey where passion meets storytelling.")
  
  // Extract user data from Clerk
  const firstName = user?.firstName || 'Movie'
  const lastName = user?.lastName || 'Enthusiast'
  const email = user?.emailAddresses?.[0]?.emailAddress || ''
  const profileImage = user?.imageUrl
  const username = user?.username || email.split('@')[0]
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500/10 via-[#0B0B0F] to-amber-500/5">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/15 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.2)] group-hover:shadow-[0_0_70px_rgba(249,115,22,0.3)] transition-all duration-500 overflow-hidden">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-4xl font-bold text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">
                      {firstName.charAt(0)}{lastName.charAt(0)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                  <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{firstName} </span>
                  <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.7)]">{lastName}</span>
                </h1>
                <p className="text-xl text-white/70 mb-2">@{username}</p>
                <p className="text-lg text-white/60 mb-6">{email}</p>
                
                {/* Bio */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 max-w-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white/90">Bio</h3>
                    <button
                      onClick={() => setIsEditingBio(!isEditingBio)}
                      className="w-8 h-8 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-full flex items-center justify-center transition-all duration-200 border border-orange-500/30 hover:border-orange-500/50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                  
                  {isEditingBio ? (
                    <div className="space-y-3">
                      <textarea
                        value={bioText}
                        onChange={(e) => setBioText(e.target.value)}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 resize-none focus:outline-none focus:border-orange-500/50 focus:bg-white/15 transition-all duration-200"
                        rows="4"
                        placeholder="Write your bio..."
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setIsEditingBio(false)}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 hover:border-white/30 transition-all duration-200 text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setIsEditingBio(false)}
                          className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-lg border border-orange-500/30 hover:border-orange-500/50 transition-all duration-200 text-sm shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/80 leading-relaxed">
                      "{bioText}"
                    </p>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setShowUserProfile(true)}
                  className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-full border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showUserProfile && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Close Button - Top Right Corner */}
          <button
            onClick={() => setShowUserProfile(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-full flex items-center justify-center transition-all duration-200 border border-orange-500/30 hover:border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* UserProfile Component */}
          <div className="mt-4">
            <UserProfile routing="hash"/>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProfileHeader
