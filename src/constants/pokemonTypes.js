export const TYPE_COLORS = {
  normal:   { color: '#9099A1', bg: 'rgba(144,153,161,0.15)', glow: 'rgba(144,153,161,0.3)', text: '#b0b8bf' },
  fire:     { color: '#FF9D55', bg: 'rgba(255,157,85,0.15)',  glow: 'rgba(255,157,85,0.35)',  text: '#ffb47a' },
  water:    { color: '#5090D3', bg: 'rgba(80,144,211,0.15)',  glow: 'rgba(80,144,211,0.35)',  text: '#6ea8e8' },
  electric: { color: '#F4D23C', bg: 'rgba(244,210,60,0.15)', glow: 'rgba(244,210,60,0.35)',  text: '#f7dc5a' },
  grass:    { color: '#63BC5A', bg: 'rgba(99,188,90,0.15)',   glow: 'rgba(99,188,90,0.35)',   text: '#80cd78' },
  ice:      { color: '#73CEC0', bg: 'rgba(115,206,192,0.15)', glow: 'rgba(115,206,192,0.35)', text: '#90d8cc' },
  fighting: { color: '#CE416B', bg: 'rgba(206,65,107,0.15)',  glow: 'rgba(206,65,107,0.35)',  text: '#e05a82' },
  poison:   { color: '#B567CE', bg: 'rgba(181,103,206,0.15)', glow: 'rgba(181,103,206,0.35)', text: '#ca88e0' },
  ground:   { color: '#D97845', bg: 'rgba(217,120,69,0.15)',  glow: 'rgba(217,120,69,0.35)',  text: '#e8966a' },
  flying:   { color: '#89AAE3', bg: 'rgba(137,170,227,0.15)', glow: 'rgba(137,170,227,0.35)', text: '#a4bde8' },
  psychic:  { color: '#FA7179', bg: 'rgba(250,113,121,0.15)', glow: 'rgba(250,113,121,0.35)', text: '#fb9098' },
  bug:      { color: '#91C12F', bg: 'rgba(145,193,47,0.15)',  glow: 'rgba(145,193,47,0.35)',  text: '#a8d24a' },
  rock:     { color: '#C5B78C', bg: 'rgba(197,183,140,0.15)', glow: 'rgba(197,183,140,0.35)', text: '#d4c9a8' },
  ghost:    { color: '#5269AD', bg: 'rgba(82,105,173,0.15)',  glow: 'rgba(82,105,173,0.35)',  text: '#7088c4' },
  dragon:   { color: '#0B6DC3', bg: 'rgba(11,109,195,0.15)',  glow: 'rgba(11,109,195,0.35)',  text: '#2d88d8' },
  dark:     { color: '#5A5465', bg: 'rgba(90,84,101,0.15)',   glow: 'rgba(90,84,101,0.35)',   text: '#7a7485' },
  steel:    { color: '#5A8EA2', bg: 'rgba(90,142,162,0.15)',  glow: 'rgba(90,142,162,0.35)',  text: '#78adc0' },
  fairy:    { color: '#EC8FE6', bg: 'rgba(236,143,230,0.15)', glow: 'rgba(236,143,230,0.35)', text: '#f2aaee' },
};

export const ALL_TYPES = Object.keys(TYPE_COLORS);

export const STAT_COLORS = {
  hp:              { color: '#ff4757', label: 'HP' },
  attack:          { color: '#ff6b35', label: 'ATK' },
  defense:         { color: '#ffd166', label: 'DEF' },
  'special-attack':  { color: '#06d6a0', label: 'SP.ATK' },
  'special-defense': { color: '#118ab2', label: 'SP.DEF' },
  speed:           { color: '#a855f7', label: 'SPD' },
};
