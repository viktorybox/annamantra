const value = (import.meta.env.PUBLIC_SITE_URL ?? '').trim();
let url: string | null = null;
if (value) {
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:') throw new Error('PUBLIC_SITE_URL must use HTTPS');
  url = parsed.origin;
}
export const siteUrl = url;
