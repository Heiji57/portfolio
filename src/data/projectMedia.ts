/**
 * Project images and videos are picked up by file convention, no imports needed:
 *
 *   src/assets/projects/<slug>/cover.webp   → list card + "next project" preview (cover.mp4 also works)
 *   src/assets/projects/<slug>/01.webp      → gallery slide 1
 *   src/assets/projects/<slug>/02.mp4       → gallery slide 2 (videos can sit between images) …
 *
 * Gallery files are ordered by file name (numeric-aware). Anything missing
 * falls back to the striped placeholder.
 */
const files = import.meta.glob<string>(
  '../assets/projects/*/*.{png,jpg,jpeg,webp,avif,gif,svg,mp4,webm,mov,m4v,PNG,JPG,JPEG,WEBP,MP4,MOV,WEBM}',
  { eager: true, import: 'default' },
);

export interface Media {
  src: string;
  kind: 'image' | 'video';
}

export interface GalleryMedia extends Media {
  /** File name without extension, e.g. `01`; the key for per-slide text in `projects.ts`. */
  name: string;
}

export interface ProjectMedia {
  cover?: Media;
  gallery: GalleryMedia[];
}

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)$/i;

const bySlug = new Map<string, { cover?: Media; gallery: GalleryMedia[] }>();

for (const [path, src] of Object.entries(files)) {
  const [slug, file] = path.split('/').slice(-2);
  const name = file.replace(/\.[^.]+$/, '');
  // Kind comes from the source path: small assets are inlined as data URIs, so the URL can't be trusted.
  const media: Media = { src, kind: VIDEO_EXT.test(file) ? 'video' : 'image' };
  const entry = bySlug.get(slug) ?? { gallery: [] };
  if (name.toLowerCase() === 'cover') entry.cover = media;
  else entry.gallery.push({ ...media, name });
  bySlug.set(slug, entry);
}

export function mediaFor(slug: string): ProjectMedia {
  const entry = bySlug.get(slug);
  if (!entry) return { gallery: [] };
  const gallery = [...entry.gallery].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  return { cover: entry.cover, gallery };
}
