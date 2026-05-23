"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Building2, Clock } from "lucide-react"

type BusinessAuthPlaceholderProps = {
  mode: "login" | "register"
}

export default function BusinessAuthPlaceholder({ mode }: BusinessAuthPlaceholderProps) {
  const isLogin = mode === "login"

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--color-accent-light)]">
          İşletme {isLogin ? "Girişi" : "Kaydı"}
        </span>
        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          {isLogin ? "İşletme paneli" : "Satıcı hesabı"}
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Uygulama ve dijital ürünlerinizi vitrine taşıyın. Bu modül kısa süre içinde aktif olacak.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20">
          {isLogin ? (
            <Building2 className="h-7 w-7 text-[var(--color-primary-light)]" />
          ) : (
            <Clock className="h-7 w-7 text-[var(--color-accent-light)]" />
          )}
        </div>
        <p className="text-sm font-medium text-white/70">Form alanları hazırlanıyor</p>
        <p className="mt-2 text-xs leading-relaxed text-white/40">
          Şirket bilgileri, vergi numarası ve ürün yönetimi adımları eklenecek. Şimdilik kullanıcı hesabı
          oluşturabilir veya kullanıcı girişi yapabilirsiniz.
        </p>
      </motion.div>

      <p className="mt-8 text-center text-sm text-white/45">
        {isLogin ? (
          <>
            İşletme kaydı için{" "}
            <Link
              href="/business/register"
              className="font-semibold text-[var(--color-primary-light)] hover:text-white transition-colors"
            >
              Kayıt Ol
            </Link>
            {" · "}
            Kullanıcı hesabı{" "}
            <Link href="/login" className="font-semibold text-white/60 hover:text-white transition-colors">
              Giriş Yap
            </Link>
          </>
        ) : (
          <>
            İşletme girişiniz var mı?{" "}
            <Link
              href="/business/login"
              className="font-semibold text-[var(--color-primary-light)] hover:text-white transition-colors"
            >
              İşletme Girişi
            </Link>
          </>
        )}
      </p>

      <p className="mt-4 text-center text-xs text-white/30">
        <Link href="/" className="hover:text-white transition-colors">
          Ana sayfaya dön
        </Link>
      </p>
    </div>
  )
}
