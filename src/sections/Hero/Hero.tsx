import { navItems, profile } from '@/data/profile';
import { HeroBackground } from './HeroBackground';
import { RoleTicker } from './RoleTicker';
import { ScrollCue } from './ScrollCue';

export function Hero() {
  return (
    <section
      id="about"
      className="relative grid min-h-screen grid-cols-[minmax(260px,380px)_minmax(0,1fr)] overflow-hidden bg-bg-hero"
    >
      <HeroBackground />

      <aside className="relative z-1 flex h-screen flex-col justify-between gap-12 border-r border-fg/8 p-10">
        <div className="flex flex-col gap-1.5">
          <h1 className="m-0 font-display text-brand font-normal uppercase">{profile.name}</h1>
          <span className="font-mono text-label text-fg-muted">
            {profile.nameKo} · {profile.title}
          </span>
        </div>

        <nav className="flex flex-col gap-3.5 font-mono text-ui uppercase">
          {navItems.map(({ href, label }, i) => {
            const current = i === 0;
            return (
              <a key={href} href={href} className={current ? 'text-fg' : 'text-fg-muted hover:text-fg'}>
                {current && '→ '}
                {label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 font-mono text-caption uppercase">
          <span className="size-2 rounded-full bg-fg" />
          {profile.availability}
        </div>
      </aside>

      <div className="pointer-events-none relative z-1 flex min-w-0 flex-col justify-center px-[clamp(24px,4vw,56px)]">
        <RoleTicker />
        <div className="mt-8 flex items-end justify-end">
          <ScrollCue href="#stack" />
        </div>
      </div>
    </section>
  );
}
