"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Shield, Zap, Globe, HeadphonesIcon, CreditCard, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Hızlı & Güvenilir",
    desc: "Yüksek performanslı altyapımızla uygulamalarınız anında yüklenir. Kesintisiz deneyim garantisi.",
    stat: "99.9%",
    statLabel: "Uptime",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Shield,
    title: "Güvenli Alışveriş",
    desc: "256-bit SSL şifreleme ile tüm işlemleriniz koruma altında. PCI DSS uyumlu ödeme altyapısı.",
    stat: "256-bit",
    statLabel: "SSL Şifreleme",
    gradient: "from-fuchsia-500 to-purple-600",
  },
  {
    icon: Globe,
    title: "Geniş Pazar Yeri",
    desc: "Her sektöre özel binlerce uygulama. İhtiyacınız olan profesyonel çözüm tek tıkla elinizde.",
    stat: "500+",
    statLabel: "Uygulama",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    icon: CreditCard,
    title: "Esnek Ödeme",
    desc: "Kredi kartı, havale, dijital cüzdan ve taksit seçenekleri ile kolayca ödeyin.",
    stat: "12",
    statLabel: "Taksit İmkanı",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Güçlü Satıcı Paneli",
    desc: "Gerçek zamanlı analitik, otomatik raporlar ve akıllı müşteri yönetim araçları.",
    stat: "Anlık",
    statLabel: "Analitik",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: HeadphonesIcon,
    title: "7/24 Destek",
    desc: "Uzman teknik destek ekibimiz her an yanınızda. Canlı sohbet ile anında yardım.",
    stat: "7/24",
    statLabel: "Canlı Destek",
    gradient: "from-cyan-400 to-blue-500",
  },
]

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background)]" />

      {/* Moving gradient orbs */}
      <motion.div style={{ y }} className="absolute top-0 left-10 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }} className="absolute bottom-0 right-10 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[var(--color-accent-light)] mb-6">
            Neden ERN Ticaret?
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Farkımız{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Ortada
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Modern altyapımız ve kullanıcı odaklı yaklaşımımızla dijital pazarda fark yaratıyoruz.
          </p>
        </motion.div>

        {/* Feature Cards - Masonry Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group card-3d relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 hover:bg-white/[0.06] transition-all duration-500 hover:shadow-2xl ${i === 0 || i === 5 ? "md:col-span-1 lg:row-span-1" : ""}`}
            >
              {/* Top row: icon + stat */}
              <div className="flex items-start justify-between mb-6">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-black bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.stat}
                  </div>
                  <div className="text-xs text-white/30">{feature.statLabel}</div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/45 leading-relaxed group-hover:text-white/60 transition-colors">{feature.desc}</p>

              {/* Shimmer line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
