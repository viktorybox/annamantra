import { navigate } from 'astro:transitions/client';

export async function followInternalLink(link: HTMLAnchorElement) {
  const destination = new URL(link.href);
  await navigate(destination.href);
  if (window.location.href !== destination.href || !destination.hash) return;
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  if (destination.hash === '#home') window.scrollTo({ top: 0, behavior });
  else document.getElementById(decodeURIComponent(destination.hash.slice(1)))?.scrollIntoView({ behavior });
}
