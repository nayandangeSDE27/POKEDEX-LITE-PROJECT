const BASE = 'https://pokeapi.co/api/v2';

export const endpoints = {
  pokemonList: (limit, offset) => `${BASE}/pokemon?limit=${limit}&offset=${offset}`,
  pokemon: (nameOrId) => `${BASE}/pokemon/${nameOrId}`,
  pokemonSpecies: (nameOrId) => `${BASE}/pokemon-species/${nameOrId}`,
  type: (name) => `${BASE}/type/${name}`,
  allTypes: () => `${BASE}/type?limit=18`,
};

export default endpoints;
