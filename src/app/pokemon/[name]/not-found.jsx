import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function PokemonNotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-32 flex flex-col items-center text-center gap-6">
      <div className="text-6xl select-none">👻</div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-ink-primary">Pokémon not found</h2>
        <p className="text-ink-secondary text-sm">
          That Pokémon doesn&apos;t exist in the Pokédex. Double-check the name and try again.
        </p>
      </div>
      <Link href="/">
        <Button variant="primary">Back to Pokédex</Button>
      </Link>
    </div>
  );
}
