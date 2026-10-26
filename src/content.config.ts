import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    excerpt: z.string(),
    locale: z.enum(['ru', 'fr']),
    status: z.enum(['draft', 'published']),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }).refine((post) => post.status === 'draft' || Boolean(post.publishedAt), {
    message: 'Published posts require a publication date',
    path: ['publishedAt'],
  }),
});

export const collections = { blog };
