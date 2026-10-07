/**
 * Project images are picked up by file convention, no imports needed:
 *
 *   src/assets/projects/<slug>/cover.webp   → list card + "next project" preview
 *   src/assets/projects/<slug>/01.webp      → gallery slide 1
 *   src/assets/projects/<slug>/02.webp      → gallery slide 2 …
 *
 * Gallery files are ordered by file name (numeric-aware). Anything missing
 * falls back to the striped placeholder.
 */
const files = import.meta.glob<string>(
  '../assets/projects/*/*.{png,jpg,jpeg,webp,avif,gif,svg,PNG,JPG,JPEG,WEBP}',
  { eager: true, import: 'default' },
);

export interface ProjectImages {
  cover?: string;
  gallery: string[];
}

const bySlug = new Map<string, { cover?: string; gallery: [name: string, url: string][] }>();

for (const [path, url] of Object.entries(files)) {
  const [slug, file] = path.split('/').slice(-2);
  const name = file.replace(/\.[^.]+$/, '');
  const entry = bySlug.get(slug) ?? { gallery: [] };
  if (name.toLowerCase() === 'cover') entry.cover = url;
  else entry.gallery.push([name, url]);
  bySlug.set(slug, entry);
}

export function imagesFor(slug: string): ProjectImages {
  const entry = bySlug.get(slug);
  if (!entry) return { gallery: [] };
  const gallery = [...entry.gallery]
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
  return { cover: entry.cover, gallery };
}
