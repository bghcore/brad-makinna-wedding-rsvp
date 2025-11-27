export interface Guest {
  title: string
  firstName: string
  lastName: string
  suffix: string
}

export interface Address {
  street: string
  streetLine2: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
  formatted: {
    line1: string
    line2: string
    line3: string
    line4: string
  }
}

export interface SafeGuestData {
  id: string
  rsvpId: string
  names: string
  formalAddressing: string
  sortName: string
  guest1: Guest
  guest2: Guest
  additionalGuests: Guest[]
  guestCount: number
  outOfTown: string
  // Address removed
  email: string
  phone: string
  group: string
  list: string
  giftReceived: string
  thankYouSent: string
}

export interface GuestListDocument {
  id: string
  rsvpId: string
  names: string
  formalAddressing: string
  sortName: string
  guest1: Guest
  guest2: Guest
  additionalGuests: Guest[]
  guestCount: number
  outOfTown: string
  address: Address
  email: string
  phone: string
  group: string
  list: string
  giftReceived: string
  thankYouSent: string
}

export interface RSVPSubmission {
  guestId: string
  rsvpId: string
  attending: boolean
  attendingGuests: string[]
  dietaryRestrictions?: string
  additionalNotes?: string
  submittedAt: string
  submittedBy?: string
}
