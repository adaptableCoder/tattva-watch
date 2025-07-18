import { NextResponse } from 'next/server'
import { tmdbConfig } from '@/lib/tmdb'

export async function GET() {
  try {
    const data = await tmdbConfig.getGenres()
    
    return NextResponse.json({
      success: true,
      data: data
    })
  } catch (error) {
    console.error('Genres API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch genres',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
