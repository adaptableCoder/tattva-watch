import { NextResponse } from 'next/server'
import { tmdbMovies } from '@/lib/tmdb'

export async function GET(request, { params }) {
  try {
    const movieId = params.id
    
    if (!movieId) {
      return NextResponse.json(
        { success: false, error: 'Movie ID is required' },
        { status: 400 }
      )
    }

    const data = await tmdbMovies.getDetails(movieId)
    
    return NextResponse.json({
      success: true,
      data: data
    })
  } catch (error) {
    console.error('Movie details API error:', error)
    
    if (error.message.includes('404')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Movie not found',
          message: 'The requested movie could not be found.' 
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch movie details',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
