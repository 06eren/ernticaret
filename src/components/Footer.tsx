"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0418] border-t border-white/5">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
            fill="#0a0418"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/logo.png"
              alt="ERN Ticaret"
              className="h-12 w-auto object-contain mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Türkiye&apos;nin en modern uygulama pazarı. Profesyonel yazılımları keşfet, işletmeni dijitale taşı.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all text-sm">𝕏</a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all text-sm">in</a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all text-sm">ig</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              <li><Link href="/apps" className="text-sm text-white/40 hover:text-white transition-colors">Uygulamalar</Link></li>
              <li><Link href="/categories" className="text-sm text-white/40 hover:text-white transition-colors">Kategoriler</Link></li>
              <li><Link href="/about" className="text-sm text-white/40 hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link href="/blog" className="text-sm text-white/40 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Seller */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Satıcılar İçin</h4>
            <ul className="space-y-3">
              <li><Link href="/business/register" className="text-sm text-white/40 hover:text-white transition-colors">Satıcı Ol</Link></li>
              <li><Link href="/business/login" className="text-sm text-white/40 hover:text-white transition-colors">İşletme Girişi</Link></li>
              <li><Link href="/pricing" className="text-sm text-white/40 hover:text-white transition-colors">Fiyatlandırma</Link></li>
              <li><Link href="/docs" className="text-sm text-white/40 hover:text-white transition-colors">API Dokümantasyon</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/30" />
                <a href="mailto:help@ernticaret.com.tr" className="text-sm text-white/40 hover:text-white transition-colors">help@ernticaret.com.tr</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white/30" />
                <a href="tel:+902121234567" className="text-sm text-white/40 hover:text-white transition-colors">+90 (212) 123 45 67</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white/30 mt-0.5" />
                <span className="text-sm text-white/40">İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2025 ERN Ticaret. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">Gizlilik Politikası</Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">Kullanım Şartları</Link>
            <Link href="/cookies" className="text-xs text-white/30 hover:text-white/60 transition-colors">Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
