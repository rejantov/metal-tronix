import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Metal Tronix',
  description: 'Metal Tronix specializes in CNC laser cutting, press brake forming, and precision sheet metal fabrication. Tolerances down to ±0.005". ISO 9001 certified.',
<<<<<<< HEAD
=======
  // One mark for every slot — the logo keeps its own white background, so it
  // stays legible on light and dark browser chrome alike and needs no variants.
>>>>>>> feature/our_story
  icons: {
    icon: [
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
