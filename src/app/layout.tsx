import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ArchiveBanner } from '@/components/ArchiveBanner'
import './globals.css'

/**
 * Latin variable fonts vendored in src/fonts (SIL OFL).
 * Served from this origin so visitors are not sent to Google Fonts.
 */
const geistSans = localFont({
  src: '../fonts/geist-latin.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

const geistMono = localFont({
  src: '../fonts/geist-mono-latin.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: {
    template: '%s · Wedding RSVP Admin (Archive)',
    default: 'Wedding RSVP Admin — Archive Demo',
  },
  description:
    'Archived RSVP admin dashboard for Bradley & MaKinna Hanson (married July 11, 2026). Portfolio demo with fictional guest data.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ArchiveBanner />
        {children}
      </body>
    </html>
  )
}
