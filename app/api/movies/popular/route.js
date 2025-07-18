import { NextResponse } from 'next/server'
import { tmdbMovies } from '@/lib/tmdb'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'

    const data = await tmdbMovies.getPopular(parseInt(page))
    
    return NextResponse.json({
      success: true,
      data: data
    })
  } catch (error) {
    console.error('Popular movies API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch popular movies',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
