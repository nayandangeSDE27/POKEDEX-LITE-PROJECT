export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPokemonName(name) {
  return name
    .split('-')
    .map(capitalize)
    .join(' ');
}

export function formatPokemonId(id) {
  return `#${String(id).padStart(4, '0')}`;
}

export function formatStatName(statName) {
  const map = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };
  return map[statName] || capitalize(statName);
}

export function formatHeight(decimetres) {
  const meters = decimetres / 10;
  const feet = Math.floor(meters * 3.281);
  const inches = Math.round((meters * 3.281 - feet) * 12);
  return { metric: `${meters.toFixed(1)} m`, imperial: `${feet}'${inches}"` };
}

export function formatWeight(hectograms) {
  const kg = hectograms / 10;
  const lbs = (kg * 2.205).toFixed(1);
  return { metric: `${kg.toFixed(1)} kg`, imperial: `${lbs} lbs` };
}

export function extractIdFromUrl(url) {
  const parts = url.replace(/\/$/, '').split('/');
  return parseInt(parts[parts.length - 1], 10);
}
