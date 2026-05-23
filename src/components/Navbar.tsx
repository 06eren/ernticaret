"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Store, User, Sparkles, LogOut } from "lucide-react"
import { logout } from "@/app/actions/auth"
import { SessionPayload } from "@/lib/session"

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/apps", label: "Uygulamalar" },
  { href: "/categories", label: "Kategoriler" },
  { href: "/about", label: "Hakkımızda" },
]

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick?: () => void
}) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative text-sm font-medium transition-colors ${
        active ? "text-white" : "text-white/75 hover:text-white"
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
        />
      )}
    </Link>
  )
}

type NavbarProps = {
  session: SessionPayload | null
}

export default function Navbar({ session }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/business")

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 ${isAuthRoute ? "glass-strong border-b border-white/5" : "glass-strong"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center group">
            <img
              src="/logo.png"
              alt="ERN Ticaret"
              className="h-12 w-auto object-contain sm:h-14"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <>
                <div className="mr-2 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
                  <User className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-300">
                    {session.username || "Kullanıcı"}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-500/10 transition-all cursor-pointer border-0 bg-transparent"
                >
                  <LogOut className="h-4 w-4" />
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>

                <Link
                  href="/login"
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    pathname === "/login" || pathname === "/register"
                      ? "bg-white/10 text-white"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <User className="h-4 w-4" />
                  Giriş Yap
                </Link>
                <Link
                  href="/business/login"
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md transition-all ${
                    pathname.startsWith("/business")
                      ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-rose-500/40 scale-[1.02]"
                      : "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-rose-500/20 hover:shadow-rose-500/40 hover:scale-105"
                  }`}
                >
                  <Store className="h-4 w-4" />
                  İşletme Girişi
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong overflow-hidden border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-white/10 text-white"
                      : "text-white/75 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-3 border-t border-white/10 pt-3">
                <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                  Hesap işlemleri
                </p>
                {session ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-300">
                      <User className="h-4 w-4 text-emerald-400" />
                      <span>{session.username || "Kullanıcı"}</span>
                    </div>
                    <button
                      onClick={() => {
                        setMobileOpen(false)
                        logout()
                      }}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 transition-all cursor-pointer border-0"
                    >
                      <LogOut className="h-4 w-4" />
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10"
                    >
                      <User className="h-4 w-4" />
                      Giriş Yap
                    </Link>
                    <Link
                      href="/business/login"
                      onClick={() => setMobileOpen(false)}
                      className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-500/20"
                    >
                      <Store className="h-4 w-4" />
                      İşletme Girişi
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
