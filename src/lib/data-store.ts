import type {
  GuestListDocument,
  RSVPSubmission,
  SafeGuestData,
} from '@/app/interfaces/guest'
import { DEMO_GUESTS } from '@/data/demo-guests'
import { DEMO_SEED_RSVPS } from '@/data/demo-rsvps'

/**
 * In-repo fictional guest / RSVP data for the archive demo.
 * No database, no network I/O.
 */

function toSafeGuest(guest: GuestListDocument): SafeGuestData {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { address, ...safeGuest } = guest
  return safeGuest as SafeGuestData
}

function sortSafeGuests(guests: SafeGuestData[]): SafeGuestData[] {
  return [...guests].sort((a, b) => {
    const listA = a.list || ''
    const listB = b.list || ''
    if (listA !== listB) {
      return listA.localeCompare(listB)
    }
    const sortNameA = a.sortName || ''
    const sortNameB = b.sortName || ''
    return sortNameA.localeCompare(sortNameB)
  })
}

export async function getAllGuests(): Promise<SafeGuestData[]> {
  return sortSafeGuests(DEMO_GUESTS.map(toSafeGuest))
}

export async function getAllRSVPs(): Promise<RSVPSubmission[]> {
  return [...DEMO_SEED_RSVPS].sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  )
}

export async function getGuestById(
  id: string,
): Promise<GuestListDocument | null> {
  const normalized = id.trim().toUpperCase()
  return DEMO_GUESTS.find((g) => g.id === normalized) ?? null
}
