import { NextResponse } from 'next/server'
import { getAllRSVPs } from '@/lib/cosmos'

export async function GET() {
  try {
    const rsvps = await getAllRSVPs()
    return NextResponse.json(rsvps)
  } catch (error) {
    console.error('Error fetching RSVPs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RSVPs' },
      { status: 500 }
    )
  }
}

