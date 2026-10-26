import type { APIRoute } from 'astro';
import { siteUrl } from '@/data/site-url';
export const GET: APIRoute = () => new Response(siteUrl
  ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
