import { getCollection } from 'astro:content';
import type { Locale } from './site';

export async function getVisibleBlogPosts(locale: Locale) {
  const posts = await getCollection('blog', ({ data }) =>
    data.locale === locale && (data.status === 'published' || import.meta.env.DEV),
  );

  return posts.sort((a, b) =>
    Number(b.data.status === 'published') - Number(a.data.status === 'published') ||
    (b.data.publishedAt ?? '').localeCompare(a.data.publishedAt ?? '') ||
    a.data.title.localeCompare(b.data.title, locale),
  );
}
