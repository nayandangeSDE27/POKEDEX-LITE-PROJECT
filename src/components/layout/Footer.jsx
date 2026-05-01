export default function Footer() {
  return (
    <footer className="mt-24 border-t border-surface-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>
            Data from{' '}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-secondary hover:text-ink-primary transition-colors"
            >
              PokéAPI
            </a>
            {' · '}
            Pokémon and all related names are trademarks of Nintendo / Game Freak
          </p>
          <p className="flex items-center gap-1">
            Built by Nayan Dange
          </p>
        </div>
      </div>
    </footer>
  );
}
