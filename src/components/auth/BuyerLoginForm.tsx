"use client"

import { useActionState } from "react"
import Link from "next/link"
import { AtSign, KeyRound, Loader2, User } from "lucide-react"
import { loginBuyer, type AuthActionState } from "@/app/actions/auth"
import AuthInput from "./AuthInput"

const initialState: AuthActionState = {}

type BuyerLoginFormProps = {
  registered?: boolean
}

export default function BuyerLoginForm({ registered }: BuyerLoginFormProps) {
  const [state, formAction, pending] = useActionState(loginBuyer, initialState)

  return (
    <div className="w-full">
      <div className="mb-5 text-center lg:text-left">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium tracking-wide text-[var(--color-accent-light)]">
          Kullanıcı Girişi
        </span>
        <h1 className="mt-3 text-xl font-bold text-white sm:text-2xl">Hoş geldiniz</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-white/50">
          Hesabınıza giriş yaparak uygulama ve dijital ürünleri keşfedin.
        </p>
      </div>

      {registered && (
        <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
          Kayıt başarılı. Şimdi giriş yapabilirsiniz.
        </div>
      )}

      {state.error && (
        <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4" autoComplete="on">
        <AuthInput
          name="username"
          label="Kullanıcı Adı"
          placeholder="kullaniciadi"
          autoComplete="username"
          required
          icon={<User className="h-[18px] w-[18px]" />}
        />
        <AuthInput
          name="email"
          type="email"
          label="Mail Adresi"
          placeholder="mail@ornek.com"
          autoComplete="email"
          required
          icon={<AtSign className="h-[18px] w-[18px]" />}
        />
        <AuthInput
          name="password"
          type="password"
          label="Şifre"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          icon={<KeyRound className="h-[18px] w-[18px]" />}
        />

        <button
          type="submit"
          disabled={pending}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] py-3.5 text-base font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:shadow-rose-500/35 hover:brightness-110 disabled:opacity-60 disabled:hover:brightness-100"
        >
          {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          Giriş Yap
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-white/45">
        Hesabınız yok mu?{" "}
        <Link
          href="/register"
          className="font-semibold text-[var(--color-primary-light)] hover:text-white transition-colors"
        >
          Kayıt Ol
        </Link>
      </p>

      <p className="mt-2 text-center text-xs text-white/35">
        İşletme hesabınız mı var?{" "}
        <Link
          href="/business/login"
          className="text-white/55 underline-offset-2 hover:text-white hover:underline"
        >
          İşletme Girişi
        </Link>
      </p>
    </div>
  )
}
