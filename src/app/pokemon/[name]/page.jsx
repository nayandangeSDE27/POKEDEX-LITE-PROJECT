import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPokemonDetail, getPokemonSpecies, getSpriteUrl, getFlavorText } from '@/lib/api/pokeapi';
import { formatPokemonName, formatPokemonId, formatHeight, formatWeight } from '@/lib/utils/format';
import { TYPE_COLORS } from '@/constants/pokemonTypes';
import TypeBadge from '@/components/pokemon/TypeBadge';
import PokemonStats from '@/components/pokemon/PokemonStats';

export async function generateMetadata({ params }) {
  try {
    const pokemon = await getPokemonDetail(params.name);
    const sprite = getSpriteUrl(pokemon);
    const name = formatPokemonName(pokemon.name);
    const primaryType = pokemon.types[0]?.type.name || 'normal';
    const description = `${name} is a ${pokemon.types.map((t) => t.type.name).join('/')} type Pokémon. Base stats: HP ${pokemon.stats[0]?.base_stat}, Attack ${pokemon.stats[1]?.base_stat}.`;

    return {
      title: `${name} — Pokédex Lite`,
      description,
      openGraph: {
        title: `${name} — Pokédex Lite`,
        description,
        images: sprite ? [{ url: sprite, width: 475, height: 475, alt: name }] : [],
      },
      twitter: {
        card: 'summary',
        title: `${name} — Pokédex Lite`,
        description,
        images: sprite ? [sprite] : [],
      },
    };
  } catch {
    return { title: 'Pokémon not found — Pokédex Lite' };
  }
}

export async function generateStaticParams() {
  const { getAllPokemonNames } = await import('@/lib/api/pokeapi');
  const allNames = await getAllPokemonNames();
  return allNames.slice(0, 151).map((p) => ({ name: p.name }));
}

export default async function PokemonPage({ params }) {
  let pokemon, species;

  try {
    pokemon = await getPokemonDetail(params.name);
  } catch (err) {
    if (err.status === 404) notFound();
    throw err;
  }

  species = await getPokemonSpecies(params.name);

  const sprite = getSpriteUrl(pokemon);
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = TYPE_COLORS[primaryType];
  const flavor = species ? getFlavorText(species) : null;
  const height = formatHeight(pokemon.height);
  const weight = formatWeight(pokemon.weight);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" />
        </svg>
        Back to Pokédex
      </Link>

      <div className="rounded-3xl border border-surface-border overflow-hidden bg-surface-card">
        {/* Hero */}
        <div
          className="relative flex flex-col sm:flex-row items-center gap-8 px-8 pt-10 pb-8"
          style={{
            background: `linear-gradient(145deg, ${typeColor.color}1a 0%, ${typeColor.color}08 50%, transparent 100%)`,
          }}
        >
          <div className="shrink-0">
            {sprite ? (
              <Image
                src={sprite}
                alt={pokemon.name}
                width={220}
                height={220}
                priority
                className="drop-shadow-2xl"
              />
            ) : (
              <div className="w-[220px] h-[220px] flex items-center justify-center text-7xl opacity-20">?</div>
            )}
          </div>

          <div className="flex-1 space-y-4 text-center sm:text-left">
            <div>
              <p className="font-mono text-sm text-ink-muted mb-1">{formatPokemonId(pokemon.id)}</p>
              <h1 className="text-4xl font-bold text-ink-primary">{formatPokemonName(pokemon.name)}</h1>
            </div>

            <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
              {pokemon.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} size="md" />
              ))}
            </div>

            {flavor && (
              <p className="text-sm text-ink-secondary leading-relaxed italic max-w-md">
                &ldquo;{flavor}&rdquo;
              </p>
            )}

            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto sm:mx-0">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-ink-muted font-semibold mb-1">Height</p>
                <p className="text-sm font-semibold text-ink-primary">{height.metric}</p>
                <p className="text-[10px] text-ink-muted">{height.imperial}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-ink-muted font-semibold mb-1">Weight</p>
                <p className="text-sm font-semibold text-ink-primary">{weight.metric}</p>
                <p className="text-[10px] text-ink-muted">{weight.imperial}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-ink-muted font-semibold mb-1">Gen</p>
                <p className="text-sm font-semibold text-ink-primary capitalize">
                  {species?.generation?.name?.replace('generation-', '')?.toUpperCase() ?? '—'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-surface-border p-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-5">Base Stats</h2>
          <PokemonStats stats={pokemon.stats} />
        </div>

        {/* Abilities */}
        <div className="border-t border-surface-border p-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-4">Abilities</h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((a) => (
              <div
                key={a.ability.name}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-elevated border border-surface-border"
              >
                <span className="text-sm font-medium text-ink-primary capitalize">
                  {a.ability.name.replace(/-/g, ' ')}
                </span>
                {a.is_hidden && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-bold uppercase tracking-wide border border-purple-500/20">
                    Hidden
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Moves */}
        <div className="border-t border-surface-border p-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-4">
            Moves <span className="text-ink-muted font-normal">({pokemon.moves.length})</span>
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {pokemon.moves.slice(0, 60).map((m) => (
              <span
                key={m.move.name}
                className="text-xs px-2.5 py-1 rounded-lg bg-surface-elevated border border-surface-border text-ink-secondary capitalize"
              >
                {m.move.name.replace(/-/g, ' ')}
              </span>
            ))}
            {pokemon.moves.length > 60 && (
              <span className="text-xs px-2.5 py-1 rounded-lg text-ink-muted">
                +{pokemon.moves.length - 60} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
