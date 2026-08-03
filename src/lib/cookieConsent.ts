const KEY = 'yunanisland-cookie-consent'
const EVENT = 'cookie-consent-change'

export type ConsentValue = 'accepted' | 'rejected'

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(KEY) as ConsentValue | null
}

export function hasAnalyticsConsent(): boolean {
  return getConsent() === 'accepted'
}

export function setConsent(value: ConsentValue) {
  localStorage.setItem(KEY, value)
  window.dispatchEvent(new Event(EVENT))
}

export function onConsentChange(callback: (consented: boolean) => void) {
  const handler = () => callback(hasAnalyticsConsent())
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}
