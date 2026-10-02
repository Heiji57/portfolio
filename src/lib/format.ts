/** Joins truthy class names. */
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/** 1 -> "01" */
export function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}
