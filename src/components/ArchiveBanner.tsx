/**
 * Site-wide notice: the wedding has already happened; this admin dashboard
 * is a historical archive + portfolio demo with fictional guest data.
 */
export function ArchiveBanner() {
  return (
    <div className="border-b border-amber-300/50 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-zinc-900 dark:text-amber-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-2.5 text-center text-sm sm:flex-row sm:gap-3 sm:px-6">
        <p className="font-medium">
          Archive · Bradley &amp; MaKinna were married July 11, 2026
        </p>
        <span
          className="hidden text-amber-400 sm:inline dark:text-amber-500/80"
          aria-hidden="true"
        >
          ·
        </span>
        <p className="text-amber-900/90 dark:text-amber-100/85">
          RSVP admin demo with fictional guest data — no live database.
        </p>
      </div>
    </div>
  )
}
