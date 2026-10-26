import type { APIRoute } from 'astro';
import { siteUrl } from '@/data/site-url';
import { getVisibleBlogPosts } from '@/data/blog';
export const GET: APIRoute = async () => {
  const paths = ['/ru/', '/fr/', '/ru/blog/', '/fr/blog/', '/ru/quiz/'];
  for (const locale of ['ru', 'fr'] as const) {
    const posts = await getVisibleBlogPosts(locale);
    paths.push(...posts.filter((post) => post.data.status === 'published').map((post) => `/${locale}/blog/${post.id}/`));
  }
  const entries = siteUrl ? paths.map((path) => `<url><loc>${siteUrl}${path}</loc></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
