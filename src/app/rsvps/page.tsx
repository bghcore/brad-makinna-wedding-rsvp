import { RSVPSubmission, SafeGuestData } from "@/app/interfaces/guest";
import { getAllRSVPs, getAllGuests } from "@/lib/data-store";
import { RSVPTabs } from "./tabs";

export default async function RSVPsPage() {
  const [rsvps, guests]: [RSVPSubmission[], SafeGuestData[]] =
    await Promise.all([getAllRSVPs(), getAllGuests()]);

  // Create a map of RSVP'd guest IDs for quick lookup
  const rsvpMap = new Map<string, RSVPSubmission>();
  rsvps.forEach((rsvp) => {
    rsvpMap.set(rsvp.rsvpId, rsvp);
    rsvpMap.set(rsvp.guestId, rsvp);
  });

  // Calculate total attending guests count from all RSVPs
  const totalAttendingGuests = rsvps.reduce((total, rsvp) => {
    if (rsvp.attending && rsvp.attendingGuests) {
      return total + rsvp.attendingGuests.length;
    }
    return total;
  }, 0);

  // Calculate total pending people count (individual people, not parties)
  const totalPendingPeople = guests.reduce((total, guest) => {
    const hasRSVP = rsvpMap.has(guest.rsvpId) || rsvpMap.has(guest.id);
    if (!hasRSVP) {
      return total + (guest.guestCount || 0);
    }
    return total;
  }, 0);

  // Organize guests by list
  const guestsByList = new Map<string, SafeGuestData[]>();
  guests.forEach((guest) => {
    const list = guest.list || "Other";
    if (!guestsByList.has(list)) {
      guestsByList.set(list, []);
    }
    guestsByList.get(list)!.push(guest);
  });

  // Sort lists alphabetically
  const sortedLists = Array.from(guestsByList.keys()).sort();

  // Prepare list data for tabs
  const listsData = sortedLists.map((list) => {
    const listGuests = guestsByList.get(list) || [];
    const rsvpGuests = listGuests.filter(
      (guest) => rsvpMap.has(guest.rsvpId) || rsvpMap.has(guest.id)
    );
    const pendingGuests = listGuests.filter(
      (guest) => !rsvpMap.has(guest.rsvpId) && !rsvpMap.has(guest.id)
    );

    // Calculate attending guests count for this list
    const listAttendingCount = rsvpGuests.reduce((total, guest) => {
      const rsvp = rsvpMap.get(guest.rsvpId) || rsvpMap.get(guest.id);
      if (rsvp?.attending && rsvp.attendingGuests) {
        return total + rsvp.attendingGuests.length;
      }
      return total;
    }, 0);

    // Calculate pending people count for this list (individual people, not parties)
    const listPendingPeople = pendingGuests.reduce((total, guest) => {
      return total + (guest.guestCount || 0);
    }, 0);

    return {
      listName: list,
      guests: listGuests,
      rsvpGuests,
      pendingGuests,
      listAttendingCount,
      listPendingPeople,
    };
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-2">
            RSVP Status
          </h1>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-3">
            Demo data only — fictional parties for portfolio review. Real
            guest PII was removed when this site was archived.
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
            Total parties: {guests.length} | RSVPs received: {rsvps.length} |
            Pending: {totalPendingPeople} people | Total attending:{" "}
            {totalAttendingGuests}
          </p>

          {/* List Summaries */}
          {listsData.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {listsData.map((list) => (
                <div
                  key={list.listName}
                  className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
                >
                  <h3 className="font-semibold text-black dark:text-zinc-50 mb-2">
                    List {list.listName}
                  </h3>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                    <p>Parties: {list.guests.length}</p>
                    <p>
                      RSVP&apos;d: {list.rsvpGuests.length} /{" "}
                      {list.guests.length}
                    </p>
                    {list.listAttendingCount > 0 && (
                      <p className="text-green-600 dark:text-green-400">
                        Attending: {list.listAttendingCount}
                      </p>
                    )}
                    {list.listPendingPeople > 0 && (
                      <p className="text-orange-600 dark:text-orange-400">
                        Pending: {list.listPendingPeople} people
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tabs for Lists and RSVP Submissions */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <RSVPTabs lists={listsData} rsvps={rsvps} rsvpMap={rsvpMap} guests={guests} />
        </div>
      </div>
    </div>
  );
}
