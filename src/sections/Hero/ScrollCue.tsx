export function ScrollCue({ href }: { href: string }) {
  return (
    <a href={href} aria-label="Scroll down" className="pointer-events-auto flex flex-col items-center gap-4">
      <span className="font-mono text-caption tracking-cue text-fg-muted uppercase [writing-mode:vertical-rl]">
        Scroll down
      </span>
      <span className="relative block h-24 w-px overflow-hidden bg-line">
        <span className="absolute top-0 left-0 h-2/5 w-px animate-scroll-cue bg-fg" />
      </span>
    </a>
  );
}
