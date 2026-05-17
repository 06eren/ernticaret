"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Store, Users, TrendingUp, ShieldCheck } from "lucide-react"

const showcaseItems = [
  {
    id: 0,
    icon: Store,
    title: "Mağazanı Kur",
    desc: "Dakikalar içinde profesyonel mağazanı oluştur. Özelleştirilebilir vitrin, kolay ürün ekleme ve marka yönetimi.",
    gradient: "from-rose-500 to-pink-600",
    features: ["Sürükle-bırak vitrin düzenleyici", "Sınırsız ürün ekleme", "Özel alan adı desteği"],
    mockupBg: "from-rose-500/20 to-pink-500/10",
  },
  {
    id: 1,
    icon: Users,
    title: "Müşterilerini Bul",
    desc: "Binlerce aktif kullanıcıya anında ulaş. Akıllı arama ve öneri algoritmaları ürünlerini doğru kişilere gösterir.",
    gradient: "from-fuchsia-500 to-purple-600",
    features: ["Akıllı öneri sistemi", "SEO optimizasyonu", "Sosyal medya entegrasyonu"],
    mockupBg: "from-fuchsia-500/20 to-purple-500/10",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Satışlarını Büyüt",
    desc: "Detaylı analitik ve raporlar ile işini büyüt. Kampanya yönetimi, indirimler ve müşteri sadakat programları.",
    gradient: "from-violet-500 to-indigo-600",
    features: ["Gerçek zamanlı satış raporları", "Otomatik kampanya yönetimi", "Müşteri segmentasyonu"],
    mockupBg: "from-violet-500/20 to-indigo-500/10",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Güvende Kal",
    desc: "Güvenli ödeme altyapısı, SSL sertifikası ve 7/24 destek ile her adımda yanındayız.",
    gradient: "from-amber-400 to-orange-500",
    features: ["PCI DSS uyumlu ödeme", "7/24 teknik destek", "Otomatik yedekleme"],
    mockupBg: "from-amber-400/20 to-orange-500/10",
  },
]

export default function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v: number) => {
      const index = Math.min(Math.floor(v * showcaseItems.length), showcaseItems.length - 1)
      setActiveIndex(index)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const activeItem = showcaseItems[activeIndex]

  return (
    <section ref={containerRef} className="relative" style={{ height: `${showcaseItems.length * 100}vh` }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0f0620]" />

        {/* Animated bg orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
          animate={{
            background: activeIndex === 0 ? "radial-gradient(circle, #e11d48, transparent)"
              : activeIndex === 1 ? "radial-gradient(circle, #c026d3, transparent)"
              : activeIndex === 2 ? "radial-gradient(circle, #7c3aed, transparent)"
              : "radial-gradient(circle, #f59e0b, transparent)",
            x: activeIndex % 2 === 0 ? "20%" : "60%",
            y: activeIndex % 2 === 0 ? "10%" : "-10%",
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Content */}
            <div>
              {/* Progress indicators */}
              <div className="flex gap-2 mb-10">
                {showcaseItems.map((_, i) => (
                  <div key={i} className="relative h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                      animate={{ width: i < activeIndex ? "100%" : i === activeIndex ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${activeItem.gradient} mb-6 shadow-xl`}>
                    <activeItem.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                    {activeItem.title}
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-white/50 mb-8 leading-relaxed max-w-lg">
                    {activeItem.desc}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-3">
                    {activeItem.features.map((feat: string, j: number) => (
                      <motion.li
                        key={feat}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.1 + 0.2 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeItem.gradient}`} />
                        <span className="text-white/60">{feat}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Visual Mockup */}
            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                  style={{ perspective: "1000px" }}
                >
                  {/* Dashboard mockup */}
                  <div className={`rounded-2xl bg-gradient-to-br ${activeItem.mockupBg} border border-white/10 p-1 shadow-2xl`}>
                    <div className="rounded-xl bg-[#1a0a2e]/80 backdrop-blur-sm p-6">
                      {/* Title bar */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-rose-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        <div className="ml-4 h-4 w-32 rounded-full bg-white/10" />
                      </div>

                      {/* Content grid */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[0, 1, 2].map((j) => (
                          <div key={j} className={`rounded-xl bg-gradient-to-br ${activeItem.gradient} p-4 aspect-square flex flex-col justify-end opacity-${j === 0 ? "100" : j === 1 ? "70" : "50"}`}>
                            <div className="h-2 w-12 rounded-full bg-white/40 mb-1" />
                            <div className="h-1.5 w-8 rounded-full bg-white/20" />
                          </div>
                        ))}
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="rounded-lg bg-white/5 p-4">
                          <div className="h-2 w-16 rounded-full bg-white/20 mb-3" />
                          <div className={`h-6 w-20 rounded bg-gradient-to-r ${activeItem.gradient} opacity-60`} />
                        </div>
                        <div className="rounded-lg bg-white/5 p-4">
                          <div className="h-2 w-12 rounded-full bg-white/20 mb-3" />
                          <div className="flex gap-1">
                            {[40, 65, 45, 80, 55, 70].map((h, k) => (
                              <div key={k} className={`w-3 rounded-sm bg-gradient-to-t ${activeItem.gradient} opacity-50`} style={{ height: `${h}%`, minHeight: "8px", maxHeight: "24px" }} />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* List items */}
                      <div className="space-y-2">
                        {[0, 1, 2].map((j) => (
                          <div key={j} className="flex items-center gap-3 rounded-lg bg-white/[0.03] p-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeItem.gradient} opacity-40`} />
                            <div className="flex-1">
                              <div className="h-2 w-24 rounded-full bg-white/15 mb-1" />
                              <div className="h-1.5 w-16 rounded-full bg-white/8" />
                            </div>
                            <div className="h-2 w-10 rounded-full bg-white/10" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-4 py-2 shadow-xl"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-sm font-bold text-white">{activeItem.title}</span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
