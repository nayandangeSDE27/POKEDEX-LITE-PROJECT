'use client';

import { SessionProvider } from 'next-auth/react';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function Providers({ children, session }) {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <FavoritesProvider session={session}>
          {children}
        </FavoritesProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
