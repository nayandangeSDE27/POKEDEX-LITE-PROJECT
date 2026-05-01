'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils/cn';
import { useFavorites } from '@/hooks/useFavorites';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navbar({ session }) {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const [signInOpen, setSignInOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSignInOpen(false);
      }
    }
    if (signInOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [signInOpen]);

  const navLinks = [
    { href: '/', label: 'Pokédex' },
    { href: '/favorites', label: 'Favorites', badge: favorites.length || null },
  ];

  return (
    <motion.header
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="sticky top-0 z-40 border-b border-surface-border bg-surface-base/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-7 h-7 relative">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="16" cy="16" r="15" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"/>
              <circle cx="16" cy="16" r="15" fill="url(#pb_grad)" fillOpacity="0.12"/>
              <path d="M1.5 16h29M16 1.5a14.5 14.5 0 000 29" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
              <path d="M1.5 16C1.5 8.82 8.044 3 16 3c7.956 0 14.5 5.82 14.5 13" fill="#e53e3e" fillOpacity="0.85"/>
              <path d="M1.5 16C1.5 23.18 8.044 29 16 29c7.956 0 14.5-5.82 14.5-13" fill="#f0f0f8" fillOpacity="0.12"/>
              <circle cx="16" cy="16" r="4.5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
              <circle cx="16" cy="16" r="2.5" fill="rgba(255,255,255,0.6)"/>
              <defs>
                <linearGradient id="pb_grad" x1="1.5" y1="1.5" x2="30.5" y2="30.5">
                  <stop stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-bold text-[15px] text-ink-primary tracking-tight">
            Pokédex<span className="text-indigo-400 font-light"> Lite</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label, badge }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'relative h-8 px-3.5 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center gap-1.5',
                  active
                    ? 'text-ink-primary bg-surface-elevated'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-elevated/50'
                )}
              >
                {label}
                {badge ? (
                  <span className="h-4 min-w-[16px] px-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold flex items-center justify-center">
                    {badge}
                  </span>
                ) : null}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-surface-elevated -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Theme + Auth */}
        <div className="flex items-center gap-2.5 shrink-0">
          <ThemeToggle />
          {session?.user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-elevated border border-surface-border">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || ''}
                    width={22}
                    height={22}
                    className="rounded-full"
                  />
                )}
                <span className="text-xs font-medium text-ink-secondary max-w-[100px] truncate">
                  {session.user.name || session.user.email}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="h-8 px-3 rounded-lg text-xs font-medium text-ink-muted hover:text-ink-secondary hover:bg-surface-elevated transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setSignInOpen((v) => !v)}
                className="h-8 px-3.5 rounded-lg text-xs font-semibold bg-surface-elevated border border-surface-border text-ink-secondary hover:text-ink-primary hover:border-white/10 transition-colors flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Sign in
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`w-3 h-3 transition-transform duration-150 ${signInOpen ? 'rotate-180' : ''}`}>
                  <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              <AnimatePresence>
                {signInOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-surface-border bg-surface-elevated shadow-xl overflow-hidden z-50"
                  >
                    <p className="px-3 pt-2.5 pb-1 text-[10px] uppercase tracking-widest text-ink-muted font-semibold">
                      Continue with
                    </p>

                    {/* GitHub */}
                    <button
                      onClick={() => { setSignInOpen(false); signIn('github'); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-ink-secondary hover:text-ink-primary hover:bg-surface-border transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </button>

                    {/* Google */}
                    <button
                      onClick={() => { setSignInOpen(false); signIn('google'); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 mb-1 text-sm text-ink-secondary hover:text-ink-primary hover:bg-surface-border transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
