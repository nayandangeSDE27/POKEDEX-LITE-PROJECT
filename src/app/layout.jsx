import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { auth } from '@/lib/auth';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Pokédex Lite — Browse all Pokémon',
    template: '%s — Pokédex Lite',
  },
  description: 'Browse, search, and filter all Pokémon. Mark your favorites. Built with Next.js.',
  keywords: ['pokemon', 'pokedex', 'pokeapi'],
  openGraph: {
    type: 'website',
    siteName: 'Pokédex Lite',
  },
};

export default async function RootLayout({ children }) {
  const session = await auth().catch(() => null);

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Runs before React hydration to prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
      </head>
      <body className="min-h-screen bg-surface-base text-ink-primary">
        <Providers session={session}>
          <Navbar session={session} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
