import { z } from 'astro/zod';
import { querySanity } from '@/lib/sanity';
import type { Locale } from './site';

const optionalText = z.string().nullish();
const homeSchema = z.object({
  heroTitle: optionalText, heroAccent: optionalText, heroBody: optionalText,
  aboutTitle: optionalText, aboutBody: optionalText,
  practiceGroupTitle: optionalText, practiceGroupBody: optionalText,
  practiceIndividualTitle: optionalText, practiceIndividualBody: optionalText,
  activationBody: optionalText, yogaBody: optionalText, finalBody: optionalText,
  heroImageUrl: optionalText,
}).nullable();
const settingsSchema = z.object({
  groupRegistration: optionalText, individualRegistration: optionalText,
  telegramChannel: optionalText, donation: optionalText, individualPrice: optionalText,
  contactEmail: optionalText,
}).nullable();
const slotsSchema = z.array(z.object({
  _id: z.string(), title: z.string(), startsAt: z.string(), timeZone: z.string(),
  registrationUrl: optionalText,
}));
const testimonialsSchema = z.array(z.object({
  _id: z.string(), name: z.string(), quote: optionalText,
  videoUrl: optionalText, posterUrl: optionalText,
}));

const homeCache = new Map<Locale, Promise<z.infer<typeof homeSchema>>>();
export function getCmsHome(locale: Locale) {
  if (!homeCache.has(locale)) {
    homeCache.set(locale, querySanity(`*[_type == "homePage" && language == $language][0]{
      heroTitle, heroAccent, heroBody, aboutTitle, aboutBody,
      practiceGroupTitle, practiceGroupBody, practiceIndividualTitle, practiceIndividualBody,
      activationBody, yogaBody, finalBody, "heroImageUrl": heroImage.asset->url
    }`, { language: locale }).then((value) => homeSchema.parse(value)));
  }
  return homeCache.get(locale)!;
}

let settingsCache: Promise<z.infer<typeof settingsSchema>> | undefined;
export function getCmsSettings() {
  settingsCache ??= querySanity(`*[_type == "siteSettings"][0]{
    groupRegistration, individualRegistration, telegramChannel, donation, individualPrice, contactEmail
  }`).then((value) => settingsSchema.parse(value));
  return settingsCache;
}

export async function getCmsSlots(locale: Locale) {
  const value = await querySanity(`*[_type == "sessionSlot" && language == $language && status == "available" && dateTime(startsAt) > dateTime(now())] | order(startsAt asc){
    _id, title, startsAt, timeZone, registrationUrl
  }`, { language: locale });
  return slotsSchema.parse(value ?? []);
}

export async function getCmsTestimonials(locale: Locale) {
  const value = await querySanity(`*[_type == "testimonial" && language == $language && approved == true] | order(orderRank asc){
    _id, name, quote, "videoUrl": video.asset->url, "posterUrl": poster.asset->url
  }`, { language: locale });
  return testimonialsSchema.parse(value ?? []);
}
