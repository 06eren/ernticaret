/** 10 haneli TR cep (5 ile başlar, başında 0 yok) */
export function extractTurkishMobileDigits(raw: string): string {
  let digits = raw.replace(/\D/g, "")

  if (digits.startsWith("90")) digits = digits.slice(2)
  if (digits.startsWith("0")) digits = digits.slice(1)

  return digits.slice(0, 10)
}

/** Görünen format: 555 555 55 55 */
export function formatTurkishMobileDisplay(digits: string): string {
  const d = extractTurkishMobileDigits(digits)
  const parts: string[] = []

  if (d.length > 0) parts.push(d.slice(0, 3))
  if (d.length > 3) parts.push(d.slice(3, 6))
  if (d.length > 6) parts.push(d.slice(6, 8))
  if (d.length > 8) parts.push(d.slice(8, 10))

  return parts.join(" ")
}

/** Veritabanı / form: +905551234567 */
export function toTurkishE164(digits: string): string | null {
  const d = extractTurkishMobileDigits(digits)
  if (d.length !== 10 || !d.startsWith("5")) return null
  return `+90${d}`
}

export function isValidTurkishMobile(digits: string): boolean {
  return toTurkishE164(digits) !== null
}
