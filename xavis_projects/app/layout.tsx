import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import RootLayoutComponent from '../components/RootLayoutComponent';
import { createClient } from '@/lib/supabase/server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Xavier's Portfolio Website",
  description: 'Created and maintained by Xavier Mendez',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const signedIn = user != null

  return (
    <html lang='en'>
      <body className={'bg-[#0F172A] ' + `${geistSans.variable} ${geistMono.variable}`}>
        
          <RootLayoutComponent initialSignedIn={signedIn}>
              {children}
              <Analytics />
          </RootLayoutComponent>

      </body>
    </html >
  );
}
