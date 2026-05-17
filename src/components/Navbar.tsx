"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Store, User, Sparkles } from "lucide-react"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]">
              <Sparkles className="h-5 w-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 blur-lg transition-opacity group-hover:opacity-60" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary-light)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              ERN Market
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-white/75 hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/apps" className="text-sm font-medium text-white/75 hover:text-white transition-colors">
              Uygulamalar
            </Link>
            <Link href="/categories" className="text-sm font-medium text-white/75 hover:text-white transition-colors">
              Kategoriler
            </Link>
            <Link href="/about" className="text-sm font-medium text-white/75 hover:text-white transition-colors">
              Hakkımızda
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 transition-all"
            >
              <User className="h-4 w-4" />
              Giriş Yap
            </Link>
            <Link
              href="/business/login"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-rose-500/20 hover:shadow-rose-500/40 hover:scale-105 transition-all"
            >
              <Store className="h-4 w-4" />
              İşletme Girişi
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block text-sm font-medium text-white/75 hover:text-white py-2">
                Ana Sayfa
              </Link>
              <Link href="/apps" className="block text-sm font-medium text-white/75 hover:text-white py-2">
                Uygulamalar
              </Link>
              <Link href="/categories" className="block text-sm font-medium text-white/75 hover:text-white py-2">
                Kategoriler
              </Link>
              <Link href="/about" className="block text-sm font-medium text-white/75 hover:text-white py-2">
                Hakkımızda
              </Link>
              <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 border border-white/15 hover:bg-white/10"
                >
                  <User className="h-4 w-4" />
                  Giriş Yap
                </Link>
                <Link
                  href="/business/login"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-500/20"
                >
                  <Store className="h-4 w-4" />
                  İşletme Girişi
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
