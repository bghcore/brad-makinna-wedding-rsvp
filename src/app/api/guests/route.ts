import { NextResponse } from 'next/server'
import { getAllGuests } from '@/lib/data-store'

export async function GET() {
  try {
    const guests = await getAllGuests()
    return NextResponse.json(guests)
  } catch (error) {
    console.error('Error fetching guests:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch guests', details: errorMessage },
      { status: 500 },
    )
  }
}
