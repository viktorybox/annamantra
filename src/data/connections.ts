import { getCmsSettings } from './cms';

export function verifiedExternalUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export const connections = {
  groupRegistration: verifiedExternalUrl(import.meta.env.PUBLIC_GROUP_REGISTRATION_URL),
  individualRegistration: verifiedExternalUrl(import.meta.env.PUBLIC_INDIVIDUAL_REGISTRATION_URL),
  telegramChannel: verifiedExternalUrl(import.meta.env.PUBLIC_TELEGRAM_CHANNEL_URL),
  donation: verifiedExternalUrl(import.meta.env.PUBLIC_DONATION_URL),
  individualPrice: (import.meta.env.PUBLIC_INDIVIDUAL_PRICE ?? '').trim() || null,
  contactEmail: null as string | null,
};

export async function getConnections() {
  const settings = await getCmsSettings();
  if (!settings) return connections;
  return {
    groupRegistration: verifiedExternalUrl(settings.groupRegistration),
    individualRegistration: verifiedExternalUrl(settings.individualRegistration),
    telegramChannel: verifiedExternalUrl(settings.telegramChannel),
    donation: verifiedExternalUrl(settings.donation),
    individualPrice: settings.individualPrice?.trim() || null,
    contactEmail: settings.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.contactEmail) ? settings.contactEmail : null,
  };
}
