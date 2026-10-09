import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { site } from '@/config/site';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ variable: '--font-space-grotesk', subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${site.name} | ${site.role}`,
  description: 'Full-stack web apps, AI-powered products and interactive 3D sites.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
