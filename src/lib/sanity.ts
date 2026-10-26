import { createClient } from '@sanity/client';

const projectId = (import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '').trim();
const dataset = (import.meta.env.PUBLIC_SANITY_DATASET ?? 'production').trim();

export const cmsEnabled = Boolean(projectId);

export const sanityClient = projectId ? createClient({
  projectId,
  dataset,
  apiVersion: '2026-10-01',
  perspective: 'published',
  useCdn: false,
  timeout: 15000,
}) : null;

export async function querySanity<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!sanityClient) return null;
  // A failed CMS request must stop the build and preserve the last deployed site.
  return sanityClient.fetch<T>(query, params);
}
