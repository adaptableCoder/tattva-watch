import { NextResponse } from 'next/server'
import { tmdbMovies } from '@/lib/tmdb'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract filter parameters
    const filters = {
      page: searchParams.get('page') || '1',
      sortBy: searchParams.get('sort_by') || 'popularity.desc',
      genre: searchParams.get('genre'),
      year: searchParams.get('year'),
      minRating: searchParams.get('min_rating'),
      maxRating: searchParams.get('max_rating')
    }

    // Remove undefined values
    Object.keys(filters).forEach(key => {
      if (filters[key] === null || filters[key] === undefined || filters[key] === '') {
        delete filters[key]
      }
    })

    const data = await tmdbMovies.discover(filters)
    
    return NextResponse.json({
      success: true,
      data: data
    })
  } catch (error) {
    console.error('Movie discover API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to discover movies',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
