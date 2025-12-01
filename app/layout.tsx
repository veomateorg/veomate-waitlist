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
  title: 'VeoMate - Join the Waitlist',
  description:
    'Join the VeoMate waitlist and be the first to experience the future of visual collaboration. Where Discord meets Excalidraw meets Notion.',
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
