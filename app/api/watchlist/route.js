import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import connectDB from '@/db/connectDb'
import Watchlist from '@/models/Watchlist'

// Helper function to set up request
async function setupRequest() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('User not authenticated')
  }
  
  await connectDB()
  return userId
}

// GET - Get user's watchlist
export async function GET() {
  try {
    const userId = await setupRequest()
    const watchlist = await Watchlist.find({ userId }).sort({ addedAt: -1 })
    return NextResponse.json({ watchlist })
  } catch (error) {
    console.error('Error fetching watchlist:', error)
    const status = error.message === 'User not authenticated' ? 401 : 500
    return NextResponse.json(
      { error: error.message || 'Failed to fetch watchlist' },
      { status }
    )
  }
}

// POST - Add movie to watchlist
export async function POST(request) {
  try {
    const userId = await setupRequest()
    const { movieId, movieData } = await request.json()
    
    // Check if movie already exists in watchlist
    const existingItem = await Watchlist.findOne({ userId, movieId })
    if (existingItem) {
      return NextResponse.json(
        { error: 'Movie already in watchlist' },
        { status: 400 }
      )
    }
    
    // Create new watchlist item
    const watchlistItem = new Watchlist({
      userId,
      movieId,
      movieData
    })
    
    await watchlistItem.save()
    return NextResponse.json({ success: true, item: watchlistItem })
  } catch (error) {
    console.error('Error adding to watchlist:', error)
    const status = error.message === 'User not authenticated' ? 401 : 500
    return NextResponse.json(
      { error: error.message || 'Failed to add to watchlist' },
      { status }
    )
  }
}

// DELETE - Remove movie from watchlist
export async function DELETE(request) {
  try {
    const userId = await setupRequest()
    const { movieId } = await request.json()
    
    const result = await Watchlist.deleteOne({ userId, movieId })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Movie not found in watchlist' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing from watchlist:', error)
    const status = error.message === 'User not authenticated' ? 401 : 500
    return NextResponse.json(
      { error: error.message || 'Failed to remove from watchlist' },
      { status }
    )
  }
}