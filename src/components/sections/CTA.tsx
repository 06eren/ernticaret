"use client"

import { motion } from "framer-motion"
import { ArrowRight, Store, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-1">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,70 C480,0 960,100 1440,30 L1440,100 L0,100 Z"
            fill="#130828"
          />
        </svg>
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-[#130828]" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-12 lg:p-20 text-center overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-b from-rose-500/20 to-fuchsia-500/20 rounded-full blur-3xl" />

          {/* Sparkle decoration */}
          <div className="absolute top-6 right-8 animate-float-gentle">
            <Sparkles className="w-6 h-6 text-amber-400/30" />
          </div>
          <div className="absolute bottom-8 left-10 animate-float-slow">
            <Sparkles className="w-5 h-5 text-rose-400/20" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              İşletmeni{" "}
              <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                Dijitale Taşı
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              Uygulamanı binlerce kullanıcıya ulaştır. ERN Ticaret&apos;te satıcı ol,
              dijital pazarda yerini al.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/business/register"
                className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all duration-300"
              >
                <Store className="w-5 h-5" />
                Hemen Satıcı Ol
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-lg font-medium text-white/70 hover:text-white hover:bg-white/5 hover:border-white/25 transition-all duration-300"
              >
                Daha Fazla Bilgi
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
