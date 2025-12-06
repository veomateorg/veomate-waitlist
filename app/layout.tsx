import type { Metadata } from 'next';
import { Geist_Mono, Space_Grotesk, Outfit } from 'next/font/google';
import './globals.css';
import GlobalFooterIcons from '@/components/GlobalFooterIcons';

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
  metadataBase: new URL('https://waitlist.veomate.com'),
  title: {
    default: 'VeoMate Waitlist',
    template: '%s | VeoMate',
  },
  description:
    'The unified workspace fusing canvas, project management, and chat. Join the waitlist.',
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
    url: 'https://waitlist.veomate.com',
    title: 'VeoMate Waitlist',
    description:
      'The unified workspace fusing canvas, project management, and chat. Join the waitlist.',
    siteName: 'VeoMate',
    images: [
      {
        url: 'https://waitlist.veomate.com/veomate-waitlist-og.png',
        width: 1200,
        height: 630,
        alt: 'VeoMate Waitlist',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeoMate Waitlist',
    description:
      'The unified workspace fusing canvas, project management, and chat. Join the waitlist.',
    creator: '@veomate',
    images: [
      {
        url: 'https://waitlist.veomate.com/veomate-waitlist-og.png',
        alt: 'VeoMate Waitlist',
      },
    ],
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
        <GlobalFooterIcons />
      </body>
    </html>
  );
}
