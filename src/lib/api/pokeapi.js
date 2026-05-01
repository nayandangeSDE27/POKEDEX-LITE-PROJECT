import endpoints from './endpoints';
import { MAX_POKEMON } from '@/constants/config';

async function fetchJSON(url) {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    if (res.status === 404) {
      const error = new Error(`Not found: ${url}`);
      error.status = 404;
      throw error;
    }
    throw new Error(`API error ${res.status}: ${url}`);
  }
  return res.json();
}

export async function getAllPokemonNames() {
  const data = await fetchJSON(endpoints.pokemonList(MAX_POKEMON, 0));
  return data.results;
}

export async function getPokemonList(limit, offset) {
  const data = await fetchJSON(endpoints.pokemonList(limit, offset));
  return data.results;
}

export async function getPokemonDetail(nameOrId) {
  return fetchJSON(endpoints.pokemon(nameOrId));
}

export async function getPokemonSpecies(nameOrId) {
  try {
    return await fetchJSON(endpoints.pokemonSpecies(nameOrId));
  } catch {
    return null;
  }
}

export async function getPokemonByType(typeName) {
  const data = await fetchJSON(endpoints.type(typeName));
  return data.pokemon.map((p) => p.pokemon.name);
}

export async function fetchPokemonBatch(names) {
  const results = await Promise.allSettled(names.map((name) => getPokemonDetail(name)));
  return results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => r.value);
}

export function getSpriteUrl(pokemon) {
  return (
    pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default ||
    null
  );
}

export function getFlavorText(species) {
  if (!species?.flavor_text_entries) return null;
  const entry = species.flavor_text_entries.find((e) => e.language.name === 'en');
  return entry?.flavor_text?.replace(/\f/g, ' ').replace(/\n/g, ' ') ?? null;
}
