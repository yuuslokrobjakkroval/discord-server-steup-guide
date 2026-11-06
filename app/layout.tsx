import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
const poppins = localFont({
  src: [
    {path: './fonts/Poppins-Medium.ttf', weight: '500', style: 'normal'},
    {path: './fonts/Poppins-ExtraBold.ttf', weight: '800', style: 'normal'},
  ],
  variable: '--font-poppins',
  display: 'swap',
});
const title = 'Server Essentials | Discord Server Setup Guide';
const description = 'Build a better Discord server with step-by-step setup guides, channel blueprints, copyable colors and symbols, and downloadable design assets.';

export const metadata: Metadata = {
  title,
  description,
  applicationName: 'Server Essentials',
  openGraph: {
    title,
    description,
    siteName: 'Server Essentials',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en" className={poppins.variable}><body>{children}</body></html>}
