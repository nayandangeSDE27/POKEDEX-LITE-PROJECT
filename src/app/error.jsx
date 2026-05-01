'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-32 flex flex-col items-center text-center gap-6">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-3xl">
        ⚠️
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-ink-primary">Something went wrong</h2>
        <p className="text-ink-secondary text-sm max-w-sm">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
      </div>
      <Button onClick={reset} variant="secondary">
        Try again
      </Button>
    </div>
  );
}
