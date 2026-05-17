"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

/* ——— Animated Counter ——— */
function Counter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent mb-2">
        {count.toLocaleString("tr-TR")}{suffix}
      </div>
      <div className="text-sm sm:text-base text-white/40 font-medium">{label}</div>
    </div>
  )
}

/* ——— Testimonials ——— */
const testimonials = [
  {
    name: "Ahmet Yılmaz",
    role: "CEO, TechStart",
    text: "ERN Ticaret sayesinde yazılımımızı binlerce müşteriye ulaştırdık. Satıcı paneli gerçekten çok pratik.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    name: "Elif Demir",
    role: "Kurucu, DesignStudio",
    text: "Güvenli ödeme altyapısı ve 7/24 destek ile hiç sorun yaşamadık. Kesinlikle tavsiye ediyorum.",
    gradient: "from-fuchsia-500 to-purple-600",
  },
  {
    name: "Mehmet Kaya",
    role: "CTO, DataFlow",
    text: "API dokümantasyonu çok detaylı ve ekip her konuda yardımcı. İşletmemiz %40 büyüdü.",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    name: "Zeynep Arslan",
    role: "Müdür, EduTech",
    text: "Eğitim yazılımımızı burada satışa sunduk ve ilk ayda 500+ indirme aldık. Harika bir platform.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    name: "Can Özkan",
    role: "Geliştirici",
    text: "Hem alıcı hem satıcı olarak kullanıyorum. Arayüz çok modern ve kullanımı kolay.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    name: "Selin Yıldız",
    role: "Pazarlama, GrowthCo",
    text: "Kampanya yönetim araçları mükemmel. Hedef kitleye ulaşmak hiç bu kadar kolay olmamıştı.",
    gradient: "from-emerald-400 to-teal-500",
  },
]

export default function FeaturedApps() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[#0f0620] to-[var(--background)]" />

      <div className="relative z-10">
        {/* Stats Counter Section */}
        <div className="mx-auto max-w-6xl px-6 lg:px-8 mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-white/[0.03] border border-white/[0.06] p-10 sm:p-16"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              <Counter target={500} suffix="+" label="Uygulama" />
              <Counter target={1200} suffix="+" label="İşletme" />
              <Counter target={50000} suffix="+" label="Kullanıcı" />
              <Counter target={98} suffix="%" label="Memnuniyet" />
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[var(--color-accent-light)] mb-6">
              Müşterilerimiz Ne Diyor?
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Güvenilir{" "}
              <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                Yorumlar
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Marquee - Row 1 (left to right) */}
        <div className="relative mb-6 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 animate-marquee-left">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="flex-shrink-0 w-[380px] rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 hover:bg-white/[0.06] transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-white/10 mb-4" />
                <p className="text-white/60 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/35">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee - Row 2 (right to left) */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 animate-marquee-right">
            {[...testimonials.slice(3), ...testimonials.slice(3)].map((t, i) => (
              <div
                key={`${t.name}-rev-${i}`}
                className="flex-shrink-0 w-[380px] rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 hover:bg-white/[0.06] transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-white/10 mb-4" />
                <p className="text-white/60 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/35">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
