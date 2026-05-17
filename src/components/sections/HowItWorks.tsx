"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { Search, ShieldCheck, CreditCard, Rocket } from "lucide-react"

const steps = [
  {
    id: 0,
    icon: Search,
    step: "01",
    title: "Keşfet",
    desc: "Binlerce uygulama arasından ihtiyacına en uygun olanı bul. Akıllı arama ve filtreleme ile saniyeler içinde sonuca ulaş.",
    gradient: "from-rose-500 to-pink-600",
    visual: {
      emoji: "🔍",
      items: ["CRM Yazılımı", "E-Ticaret Altyapısı", "Muhasebe Programı", "Stok Takip"],
    },
  },
  {
    id: 1,
    icon: ShieldCheck,
    step: "02",
    title: "İncele & Güven",
    desc: "Gerçek kullanıcı yorumlarını oku. Detaylı ekran görüntüleri, demo videolar ve karşılaştırmalar ile doğru kararı ver.",
    gradient: "from-fuchsia-500 to-purple-600",
    visual: {
      emoji: "⭐",
      items: ["4.9 Puan", "1.2K Yorum", "Demo İzle", "Ücretsiz Dene"],
    },
  },
  {
    id: 2,
    icon: CreditCard,
    step: "03",
    title: "Satın Al",
    desc: "Güvenli ödeme altyapısı ile anında satın al. Kredi kartı, havale veya taksit seçenekleri ile kolayca öde.",
    gradient: "from-violet-500 to-indigo-600",
    visual: {
      emoji: "💳",
      items: ["256-bit SSL", "12 Taksit", "Anında Teslimat", "İade Garantisi"],
    },
  },
  {
    id: 3,
    icon: Rocket,
    step: "04",
    title: "Kullan & Büyü",
    desc: "Uygulamanı hemen kullanmaya başla. 7/24 destek ekibi ve detaylı dokümantasyon ile işini bir üst seviyeye taşı.",
    gradient: "from-amber-400 to-orange-500",
    visual: {
      emoji: "🚀",
      items: ["Anında Erişim", "7/24 Destek", "Ücretsiz Güncellemeler", "API Erişimi"],
    },
  },
]

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v: number) => {
      const index = Math.min(Math.floor(v * steps.length), steps.length - 1)
      setActiveIndex(index)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const activeStep = steps[activeIndex]

  return (
    <section ref={containerRef} className="relative" style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[var(--background)]" />

        {/* Spinning rings decoration */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] opacity-[0.04]">
          <div className="w-full h-full border border-white/30 rounded-full animate-spin-slow" />
          <div className="absolute inset-16 border border-white/20 rounded-full animate-spin-slow" style={{ animationDirection: "reverse" }} />
          <div className="absolute inset-32 border border-white/10 rounded-full animate-spin-slow" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Timeline + Content */}
            <div className="flex gap-8">
              {/* Vertical Timeline */}
              <div className="hidden sm:flex flex-col items-center pt-2">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex flex-col items-center">
                    {/* Dot */}
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500 ${
                        i <= activeIndex
                          ? "border-transparent bg-gradient-to-br " + s.gradient + " text-white shadow-lg"
                          : "border-white/10 bg-white/5 text-white/30"
                      }`}
                      animate={{ scale: i === activeIndex ? 1.15 : 1 }}
                    >
                      {s.step}
                    </motion.div>
                    {/* Line */}
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-16 bg-white/10 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-x-0 top-0 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)]"
                          animate={{ height: i < activeIndex ? "100%" : "0%" }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[var(--color-accent-light)] mb-6">
                  Nasıl Çalışır?
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${activeStep.gradient} mb-5 shadow-xl`}>
                      <activeStep.icon className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                      {activeStep.title}
                    </h2>

                    <p className="text-lg text-white/50 leading-relaxed max-w-lg">
                      {activeStep.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Visual Cards */}
            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 30, rotateY: -5 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -30, rotateY: 5 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Main card */}
                  <div className="rounded-3xl bg-white/[0.03] border border-white/[0.08] p-10 backdrop-blur-sm">
                    {/* Big emoji */}
                    <div className="text-7xl mb-8 animate-float-gentle">{activeStep.visual.emoji}</div>

                    {/* Feature pills */}
                    <div className="grid grid-cols-2 gap-3">
                      {activeStep.visual.items.map((item: string, j: number) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: j * 0.1 + 0.2 }}
                          className={`rounded-xl bg-gradient-to-br ${activeStep.gradient} bg-opacity-10 p-4 border border-white/5`}
                          style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))` }}
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeStep.gradient} flex items-center justify-center mb-3 shadow-md`}>
                            <span className="text-white text-xs font-bold">{j + 1}</span>
                          </div>
                          <span className="text-white/70 text-sm font-medium">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Step counter badge */}
                  <motion.div
                    className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-2xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-2xl font-black text-white">{activeStep.step}</span>
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
