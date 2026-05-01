import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

export function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return supabaseInstance;
}

export async function getFavoritesFromDB(userId) {
  const db = getSupabase();
  if (!db) return [];
  const { data, error } = await db
    .from('favorites')
    .select('pokemon_name')
    .eq('user_id', userId);
  if (error) {
    console.error('Supabase getFavorites error:', error);
    return [];
  }
  return data.map((row) => row.pokemon_name);
}

export async function addFavoriteToDB(userId, pokemonName) {
  const db = getSupabase();
  if (!db) return false;
  const { error } = await db
    .from('favorites')
    .upsert({ user_id: userId, pokemon_name: pokemonName }, { onConflict: 'user_id,pokemon_name' });
  return !error;
}

export async function removeFavoriteFromDB(userId, pokemonName) {
  const db = getSupabase();
  if (!db) return false;
  const { error } = await db
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('pokemon_name', pokemonName);
  return !error;
}

export async function mergeFavoritesToDB(userId, localFavorites) {
  const db = getSupabase();
  if (!db || !localFavorites.length) return;
  const rows = localFavorites.map((name) => ({ user_id: userId, pokemon_name: name }));
  await db.from('favorites').upsert(rows, { onConflict: 'user_id,pokemon_name' });
}
