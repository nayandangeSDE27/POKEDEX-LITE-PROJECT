import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 flex flex-col items-center text-center gap-6">
      <div className="text-6xl select-none">🌫️</div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-ink-primary">404 — Page not found</h2>
        <p className="text-ink-secondary text-sm">This page has fled into the tall grass.</p>
      </div>
      <Link href="/">
        <Button variant="primary">Back to Pokédex</Button>
      </Link>
    </div>
  );
}
