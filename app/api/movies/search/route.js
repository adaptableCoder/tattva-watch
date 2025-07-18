import { NextResponse } from 'next/server'
import { tmdbMovies } from '@/lib/tmdb'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const page = searchParams.get('page') || '1'
    
    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      )
    }

    const data = await tmdbMovies.search(query, parseInt(page))
    
    return NextResponse.json({
      success: true,
      data: data
    })
  } catch (error) {
    console.error('Movie search API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search movies',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
