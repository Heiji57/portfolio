/** Colours used inside the laptop screen. */
export const C = {
  fg: 'var(--color-fg)',
  muted: 'var(--color-fg-muted)',
  line: 'var(--color-line)',
  panel: 'var(--color-surface)',
  accent: 'var(--color-accent)',
  gutter: '#4a4a50',
} as const;

type Segment = readonly [text: string, color: string];

export const codeLines: Segment[][] = [
  [['@RestController', C.accent]],
  [['@RequestMapping', C.accent], ['("/api/v1")', C.fg]],
  [['public class ', C.muted], ['MeController', C.fg], [' {', C.muted]],
  [],
  [['  private final ', C.muted], ['UserService', C.fg], [' users;', C.fg]],
  [],
  [['  @GetMapping', C.accent], ['("/me")', C.fg]],
  [['  public ', C.muted], ['ResponseEntity<Profile>', C.fg], [' me() {', C.fg]],
  [['    return ', C.muted], ['ResponseEntity.ok(', C.fg]],
  [['      users.find(', C.fg], ['"jiho"', C.fg], [')', C.fg]],
  [['    );', C.fg]],
  [['  }', C.muted]],
  [['}', C.muted]],
];

export const responseLines: Segment[] = [
  ['→ GET /api/v1/me', C.muted],
  ['200 OK · 14ms', C.fg],
  ['{ "name": "Park Jiho",', C.fg],
  ['  "role": "Backend Developer",', C.fg],
  ['  "stack": ["Spring", "NestJS"] }', C.fg],
];

export const codeLength = codeLines.flat().reduce((n, [text]) => n + text.length, 0);
