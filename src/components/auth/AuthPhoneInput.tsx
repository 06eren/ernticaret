"use client"

import { useState } from "react"
import { Phone } from "lucide-react"
import {
  extractTurkishMobileDigits,
  formatTurkishMobileDisplay,
  toTurkishE164,
} from "@/lib/phone"

type AuthPhoneInputProps = {
  name?: string
  label?: string
  required?: boolean
  onDigitsChange?: (digits: string) => void
}

export default function AuthPhoneInput({
  name = "phone",
  label = "Telefon Numarası",
  required = true,
  onDigitsChange,
}: AuthPhoneInputProps) {
  const [digits, setDigits] = useState("")

  function updateDigits(next: string) {
    const normalized = extractTurkishMobileDigits(next)
    setDigits(normalized)
    onDigitsChange?.(normalized)
  }
  const display = formatTurkishMobileDisplay(digits)
  const e164 = toTurkishE164(digits) ?? ""

  return (
    <div className="space-y-2">
      <label
        htmlFor="phone-national"
        className="block text-xs font-medium uppercase tracking-wider text-white/55 sm:text-[13px]"
      >
        {label}
      </label>
      <div className="relative flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-white/20 focus-within:border-[var(--color-primary)]/60 focus-within:bg-white/8 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
          <Phone className="h-[18px] w-[18px]" />
        </span>
        <span className="shrink-0 pl-11 text-sm font-medium text-white/80 sm:text-base">+90</span>
        <input
          id="phone-national"
          type="tel"
          inputMode="numeric"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          data-lpignore="true"
          required={required}
          value={display}
          onChange={(e) => updateDigits(e.target.value)}
          onPaste={(e) => {
            e.preventDefault()
            updateDigits(e.clipboardData.getData("text"))
          }}
          placeholder="555 555 55 55"
          className="auth-input min-w-0 flex-1 border-0 bg-transparent py-3 pr-4 text-sm text-white placeholder:text-white/25 outline-none sm:text-base"
        />
      </div>
      <input type="hidden" name={name} value={e164} readOnly />
      {digits.length > 0 && digits.length < 10 && (
        <p className="text-xs text-white/40">10 haneli cep numarası girin (5 ile başlar, başında 0 yok).</p>
      )}
    </div>
  )
}
