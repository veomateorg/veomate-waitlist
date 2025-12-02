import type { Metadata } from 'next';
import { Geist_Mono, Space_Grotesk, Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://veomate-waitlist.vercel.app'),
  title: {
    default: 'VeoMate Waitlist',
    template: '%s | VeoMate',
  },
  description:
    'VeoMate eliminates context switching by fusing visual canvas, project management, and chat into one unified platform. Join the waitlist for the future of work.',
  keywords: [
    'productivity',
    'canvas',
    'collaboration',
    'project management',
    'whiteboard',
    'context-aware',
    'workflow',
    'remote work',
    'team collaboration',
    'visual planning',
  ],
  authors: [{ name: 'VeoMate Team' }],
  creator: 'VeoMate',
  publisher: 'VeoMate',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://veomate.com',
    title: 'VeoMate Waitlist',
    description:
      'VeoMate eliminates context switching by fusing visual canvas, project management, and chat into one unified platform. Join the waitlist for the future of work.',
    siteName: 'VeoMate',
    images: [
      {
        url: '/veomate-waitlist-og.png',
        width: 1200,
        height: 630,
        alt: 'VeoMate Waitlist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeoMate - The Context-Aware Canvas Platform',
    description:
      'VeoMate eliminates context switching by fusing visual canvas, project management, and chat into one unified platform. Join the waitlist for the future of work.',
    creator: '@veomate',
    images: ['/veomate-waitlist-og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased selection:bg-white/20`}
      >
        {children}
      </body>
    </html>
  );
}
