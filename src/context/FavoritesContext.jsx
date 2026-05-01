'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const FavoritesContext = createContext(null);

async function apiFavorites(method, body) {
  const res = await fetch('/api/favorites', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`favorites API ${res.status}`);
  return res.json();
}

export function FavoritesProvider({ children, session }) {
  const [localFavorites, setLocalFavorites, { hydrated, removeValue }] = useLocalStorage(
    'pokedex-favorites',
    []
  );
  const [cloudFavorites, setCloudFavorites] = useState(null);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [pendingToggles, setPendingToggles] = useState(new Set());

  const userId = session?.user?.id;
  const isLoggedIn = Boolean(userId);

  const favorites = isLoggedIn && cloudFavorites !== null ? cloudFavorites : localFavorites;

  useEffect(() => {
    if (!isLoggedIn || !hydrated) return;

    setCloudLoading(true);
    apiFavorites('GET')
      .then(async ({ favorites: dbFavs }) => {
        if (localFavorites.length > 0) {
          const merged = Array.from(new Set([...dbFavs, ...localFavorites]));
          await Promise.all(
            localFavorites.map((name) => apiFavorites('POST', { name }).catch(() => {}))
          );
          removeValue();
          setCloudFavorites(merged);
        } else {
          setCloudFavorites(dbFavs);
        }
        setCloudLoading(false);
      })
      .catch(() => {
        setCloudFavorites([]);
        setCloudLoading(false);
      });
    // localFavorites/removeValue intentionally omitted: run only once on login
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, userId, hydrated]);

  const isFavorite = useCallback((name) => favorites.includes(name), [favorites]);

  const toggleFavorite = useCallback(
    async (name) => {
      const wasFavorite = favorites.includes(name);

      if (isLoggedIn) {
        setCloudFavorites((prev) =>
          wasFavorite ? prev.filter((n) => n !== name) : [...(prev || []), name]
        );
        setPendingToggles((s) => new Set(s).add(name));

        try {
          await apiFavorites(wasFavorite ? 'DELETE' : 'POST', { name });
        } catch {
          setCloudFavorites((prev) =>
            wasFavorite ? [...(prev || []), name] : prev.filter((n) => n !== name)
          );
        } finally {
          setPendingToggles((s) => {
            const next = new Set(s);
            next.delete(name);
            return next;
          });
        }
      } else {
        setLocalFavorites((prev) =>
          wasFavorite ? prev.filter((n) => n !== name) : [...prev, name]
        );
      }
    },
    [favorites, isLoggedIn, setLocalFavorites]
  );

  const clearAllFavorites = useCallback(async () => {
    if (isLoggedIn) {
      const names = [...(cloudFavorites || [])];
      setCloudFavorites([]);
      await Promise.all(names.map((name) => apiFavorites('DELETE', { name }).catch(() => {})));
    } else {
      setLocalFavorites([]);
    }
  }, [isLoggedIn, cloudFavorites, setLocalFavorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, clearAllFavorites, cloudLoading, pendingToggles, isLoggedIn }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
