import { getCollection, type CollectionEntry } from 'astro:content';
import { z } from 'astro/zod';
import { cmsEnabled, querySanity } from '@/lib/sanity';
import type { Locale } from './site';

type BlogData = CollectionEntry<'blog'>['data'];
export type BlogPost = {
  id: string;
  data: BlogData;
  translationSlug?: string | null;
} & (
  { source: 'local'; entry: CollectionEntry<'blog'> } |
  { source: 'cms'; body: Array<{ _type: string; [key: string]: unknown }> }
);

const cmsPostsSchema = z.array(z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1), seoTitle: z.string().min(1), description: z.string().min(1),
  excerpt: z.string(), publishedAt: z.string(),
  body: z.array(z.looseObject({ _type: z.string() })),
  translationSlug: z.string().nullish(),
}));

export async function getVisibleBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const local = cmsEnabled ? [] : await getCollection('blog', ({ data }) =>
    data.locale === locale && (data.status === 'published' || import.meta.env.DEV),
  );
  const posts = new Map<string, BlogPost>(local.map((entry) => [entry.id, {
    id: entry.id, data: entry.data, entry, source: 'local' as const,
  }]));
  const response = await querySanity(`*[_type == "blogPost" && language == $language && defined(slug.current) && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc){
    "slug": slug.current, title, seoTitle, description, excerpt, publishedAt,
    body[]{..., asset->{url}}, "translationSlug": translation->slug.current
  }`, { language: locale });
  for (const post of cmsPostsSchema.parse(response ?? [])) {
    posts.set(post.slug, {
      source: 'cms', id: post.slug, body: post.body, translationSlug: post.translationSlug,
      data: { title: post.title, seoTitle: post.seoTitle, description: post.description,
        excerpt: post.excerpt, locale, status: 'published', publishedAt: post.publishedAt.slice(0, 10) },
    });
  }

  return [...posts.values()].sort((a, b) =>
    Number(b.data.status === 'published') - Number(a.data.status === 'published') ||
    (b.data.publishedAt ?? '').localeCompare(a.data.publishedAt ?? '') ||
    a.data.title.localeCompare(b.data.title, locale),
  );
}
