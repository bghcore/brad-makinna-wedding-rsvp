"use client";

import React from "react";
import { RSVPSubmission, SafeGuestData } from "@/app/interfaces/guest";

interface TabsProps {
  lists: {
    listName: string;
    guests: SafeGuestData[];
    rsvpGuests: SafeGuestData[];
    pendingGuests: SafeGuestData[];
    listAttendingCount: number;
    listPendingPeople: number;
  }[];
  rsvps: RSVPSubmission[];
  rsvpMap: Map<string, RSVPSubmission>;
  guests: SafeGuestData[];
}

export function RSVPTabs({ lists, rsvps, rsvpMap, guests }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState<string>(
    lists.length > 0 ? lists[0].listName : "rsvps"
  );

  const tabs = [
    ...lists.map((list) => ({
      id: list.listName,
      label: `List ${list.listName}`,
      content: <ListTabContent {...list} rsvpMap={rsvpMap} />,
    })),
    {
      id: "rsvps",
      label: `RSVP Submissions (${rsvps.length})`,
      content: <RSVPsTabContent rsvps={rsvps} guests={guests} />,
    },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 mb-6">
        <nav className="flex space-x-1 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

function ListTabContent({
  listName,
  guests,
  rsvpGuests,
  pendingGuests,
  listAttendingCount,
  listPendingPeople,
  rsvpMap,
}: {
  listName: string;
  guests: SafeGuestData[];
  rsvpGuests: SafeGuestData[];
  pendingGuests: SafeGuestData[];
  listAttendingCount: number;
  listPendingPeople: number;
  rsvpMap: Map<string, RSVPSubmission>;
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
          List {listName}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {rsvpGuests.length} of {guests.length} RSVP&apos;d
          {listAttendingCount > 0 && (
            <span className="text-green-600 dark:text-green-400 ml-2">
              ({listAttendingCount} attending)
            </span>
          )}
          {listPendingPeople > 0 && (
            <span className="text-orange-600 dark:text-orange-400 ml-2">
              ({listPendingPeople} people pending)
            </span>
          )}
        </p>
      </div>

      {/* Guests who have RSVP'd */}
      {rsvpGuests.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-black dark:text-zinc-50 mb-3">
            RSVP&apos;d ({rsvpGuests.length})
          </h3>
          <div className="space-y-3">
            {rsvpGuests.map((guest) => {
              const rsvp =
                rsvpMap.get(guest.rsvpId) || rsvpMap.get(guest.id);
              const attendingCount =
                rsvp?.attending && rsvp.attendingGuests
                  ? rsvp.attendingGuests.length
                  : 0;

              return (
                <div
                  key={guest.id}
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <div className="flex-1">
                    <p className="font-medium text-black dark:text-zinc-50">
                      {guest.names}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {guest.formalAddressing}
                    </p>
                    {rsvp?.attending &&
                      rsvp.attendingGuests &&
                      rsvp.attendingGuests.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                            Attending Guests ({attendingCount}):
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {rsvp.attendingGuests.map(
                              (attendingGuest, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                >
                                  {attendingGuest}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        rsvp?.attending
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }`}
                    >
                      {rsvp?.attending
                        ? `Attending (${attendingCount})`
                        : "Not Attending"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Guests who still need to RSVP */}
      {pendingGuests.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-black dark:text-zinc-50 mb-3">
            Pending RSVP ({pendingGuests.length})
          </h3>
          <div className="space-y-3">
            {pendingGuests.map((guest) => (
              <div
                key={guest.id}
                className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
              >
                <div>
                  <p className="font-medium text-black dark:text-zinc-50">
                    {guest.names}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {guest.formalAddressing}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RSVPsTabContent({ rsvps, guests }: { rsvps: RSVPSubmission[]; guests: SafeGuestData[] }) {
  // Build a map from rsvpId and guestId → guest names
  const guestNameMap = new Map<string, string>();
  guests.forEach((guest) => {
    if (guest.rsvpId) guestNameMap.set(guest.rsvpId, guest.names);
    if (guest.id) guestNameMap.set(guest.id, guest.names);
  });

  if (rsvps.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          No RSVPs found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rsvps.map((rsvp) => (
        <div
          key={rsvp.rsvpId || rsvp.guestId}
          className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-1">
                {guestNameMap.get(rsvp.rsvpId) || guestNameMap.get(rsvp.guestId) || rsvp.rsvpId || rsvp.guestId}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                RSVP ID: {rsvp.rsvpId || rsvp.guestId}
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  rsvp.attending
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >
                {rsvp.attending ? "Attending" : "Not Attending"}
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
  );
}

