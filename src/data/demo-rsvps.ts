import type { RSVPSubmission } from '@/app/interfaces/guest'

/**
 * Seed RSVP submissions for demo mode.
 * All names/notes are fictional — show attending, not-attending, dietary, pending parties.
 */
export const DEMO_SEED_RSVPS: RSVPSubmission[] = [
  {
    id: 'demo-rsvp-seed-1',
    guestId: 'D6E7F8',
    rsvpId: 'D6E7F8',
    attending: true,
    attendingGuests: ['Dr. Quinn Avery', 'Mr. Cameron Avery'],
    dietaryRestrictions: 'Quinn – vegetarian',
    additionalNotes: 'Mr. Brightside - The Killers\nDon\'t Stop Believin\' - Journey',
    submittedAt: '2026-03-01T18:00:00.000Z',
    submittedBy: 'Dr. Quinn Avery, Mr. Cameron Avery',
    group: 'Demo Colleagues',
  },
  {
    id: 'demo-rsvp-seed-2',
    guestId: 'E7F8A9',
    rsvpId: 'E7F8A9',
    attending: true,
    attendingGuests: ['Mx. Jamie Soto'],
    dietaryRestrictions: undefined,
    additionalNotes: 'Pink Pony Club\nSeptember - Earth, Wind & Fire',
    submittedAt: '2026-03-02T15:30:00.000Z',
    submittedBy: 'Mx. Jamie Soto',
    group: 'Demo Friends',
  },
  {
    id: 'demo-rsvp-seed-3',
    guestId: 'B4C5D6',
    rsvpId: 'B4C5D6',
    attending: true,
    attendingGuests: [
      'Mr. Sam Chen',
      'Mrs. Riley Chen',
      'Taylor Chen',
      'Casey Chen',
    ],
    dietaryRestrictions: 'Casey – peanut allergy',
    additionalNotes: 'Cupid Shuffle\nUptown Funk',
    submittedAt: '2026-03-03T12:00:00.000Z',
    submittedBy: 'Mr. Sam Chen, Mrs. Riley Chen',
    group: 'Demo Family',
  },
  {
    id: 'demo-rsvp-seed-4',
    guestId: 'F2A3B4',
    rsvpId: 'F2A3B4',
    attending: false,
    attendingGuests: [],
    dietaryRestrictions: undefined,
    additionalNotes: 'So sorry we cannot make it — sending love!',
    submittedAt: '2026-03-04T09:15:00.000Z',
    submittedBy: 'Mr. Reese Patel',
    group: 'Demo Family',
  },
  {
    id: 'demo-rsvp-seed-5',
    guestId: 'A3B4C5',
    rsvpId: 'A3B4C5',
    attending: true,
    attendingGuests: ['Mx. Hayden Brooks'],
    dietaryRestrictions: 'Gluten-free',
    additionalNotes: undefined,
    submittedAt: '2026-03-05T21:00:00.000Z',
    submittedBy: 'Mx. Hayden Brooks',
    group: 'Demo Colleagues',
  },
]
