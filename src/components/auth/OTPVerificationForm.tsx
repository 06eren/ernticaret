"use client"

import { useActionState, useState, useEffect } from "react"
import Link from "next/link"
import { KeyRound, Loader2, ArrowLeft, Mail } from "lucide-react"
import { verifyRegister, verifyLogin, type AuthActionState } from "@/app/actions/auth"

const initialState: AuthActionState = {}

type OTPVerificationFormProps = {
  type: "register" | "login"
}

export default function OTPVerificationForm({ type }: OTPVerificationFormProps) {
  const action = type === "register" ? verifyRegister : verifyLogin
  const [state, formAction, pending] = useActionState(action, initialState)
  const [code, setCode] = useState("")

  // 15 minutes timer in seconds (900 seconds)
  const [timeLeft, setTimeLeft] = useState(900)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center lg:text-left">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium tracking-wide text-[var(--color-accent-light)]">
          Güvenlik Doğrulaması
        </span>
        <h1 className="mt-3 text-xl font-bold text-white sm:text-2xl">E-postanızı doğrulayın</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-white/50">
          Hesap güvenliğiniz için e-postanıza 6 haneli bir doğrulama kodu gönderdik.
        </p>
      </div>

      {state.error && (
        <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-xs font-medium uppercase tracking-wider text-white/55">
            Doğrulama Kodu
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/35">
              <KeyRound className="h-[18px] w-[18px]" />
            </span>
            <input
              name="code"
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "")
                setCode(val)
              }}
              placeholder="000000"
              required
              autoFocus
              className="auth-input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pl-11 text-center font-mono text-xl tracking-[0.75rem] text-white placeholder:text-white/20 transition-all outline-none focus:border-[var(--color-primary)]/60 focus:bg-white/8 focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-white/40">
          <div className="flex items-center gap-1">
            <Mail className="h-3.5 w-3.5" />
            <span>Kodu almadınız mı?</span>
          </div>
          {timeLeft > 0 ? (
            <span>Kalan Süre: <span className="font-semibold text-rose-400">{formatTime(timeLeft)}</span></span>
          ) : (
            <Link
              href={type === "register" ? "/register" : "/login"}
              className="font-semibold text-[var(--color-primary-light)] hover:text-white transition-colors"
            >
              Tekrar Kod Gönder
            </Link>
          )}
        </div>

        <button
          type="submit"
          disabled={pending || code.length !== 6 || timeLeft <= 0}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] py-3.5 text-base font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:shadow-rose-500/35 hover:brightness-110 disabled:opacity-60 disabled:hover:brightness-100"
        >
          {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          Doğrula ve Tamamla
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-white/35">
        <Link
          href={type === "register" ? "/register" : "/login"}
          className="inline-flex items-center gap-1 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          {type === "register" ? "Kayıt ekranına geri dön" : "Giriş ekranına geri dön"}
        </Link>
      </p>
    </div>
  )
}
