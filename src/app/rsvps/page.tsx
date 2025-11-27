import { getAllRSVPs } from '@/lib/cosmos'
import { RSVPSubmission } from '@/app/interfaces/guest'

export default async function RSVPsPage() {
  let rsvps: RSVPSubmission[] = []
  let error: string | null = null

  try {
    rsvps = await getAllRSVPs()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to fetch RSVPs'
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-2">
            RSVP Submissions
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Total submissions: {rsvps.length}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200">Error: {error}</p>
          </div>
        )}

        {rsvps.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              No RSVPs found
            </p>
          </div>
        )}

        <div className="space-y-6">
          {rsvps.map((rsvp) => (
            <div
              key={rsvp.rsvpId || rsvp.guestId}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-1">
                    RSVP ID: {rsvp.rsvpId || rsvp.guestId}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Guest ID: {rsvp.guestId}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      rsvp.attending
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}
                  >
                    {rsvp.attending ? 'Attending' : 'Not Attending'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Attending Guests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {rsvp.attendingGuests && rsvp.attendingGuests.length > 0 ? (
                      rsvp.attendingGuests.map((guest, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {guest}
                        </span>
                      ))
                    ) : (
                      <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                        None
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Submitted At
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {new Date(rsvp.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {rsvp.dietaryRestrictions && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Dietary Restrictions
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {rsvp.dietaryRestrictions}
                  </p>
                </div>
              )}

              {rsvp.additionalNotes && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Additional Notes
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                    {rsvp.additionalNotes}
                  </p>
                </div>
              )}

              {rsvp.submittedBy && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Submitted By
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {rsvp.submittedBy}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

