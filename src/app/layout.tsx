import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ArchiveBanner } from '@/components/ArchiveBanner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
