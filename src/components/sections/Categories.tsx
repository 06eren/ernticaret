"use client"

import { motion } from "framer-motion"
import { Code, ShoppingCart, Briefcase, GraduationCap, Palette, Activity, Gamepad2, Music } from "lucide-react"
import Link from "next/link"

const categories = [
  { icon: Code, name: "Geliştirici Araçları", count: 124, color: "from-rose-500 to-pink-600", bg: "bg-rose-500/10" },
  { icon: ShoppingCart, name: "E-Ticaret", count: 89, color: "from-fuchsia-500 to-purple-600", bg: "bg-fuchsia-500/10" },
  { icon: Briefcase, name: "İş & Finans", count: 67, color: "from-violet-500 to-indigo-600", bg: "bg-violet-500/10" },
  { icon: GraduationCap, name: "Eğitim", count: 53, color: "from-amber-400 to-orange-500", bg: "bg-amber-400/10" },
  { icon: Palette, name: "Tasarım", count: 41, color: "from-cyan-400 to-blue-500", bg: "bg-cyan-400/10" },
  { icon: Activity, name: "Sağlık & Fitness", count: 38, color: "from-emerald-400 to-teal-500", bg: "bg-emerald-400/10" },
  { icon: Gamepad2, name: "Oyun & Eğlence", count: 72, color: "from-red-400 to-rose-500", bg: "bg-red-400/10" },
  { icon: Music, name: "Medya & Müzik", count: 45, color: "from-purple-400 to-violet-500", bg: "bg-purple-400/10" },
]

export default function Categories() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#0f0620]">
      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-rose-500/5 to-fuchsia-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[var(--color-accent-light)] mb-6">
            Kategoriler
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Popüler{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Kategoriler
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            İhtiyacına uygun uygulamayı hızlıca bul. Her sektöre özel çözümler seni bekliyor.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/categories/${cat.name.toLowerCase()}`}
                className="group relative flex flex-col items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 lg:p-8 hover:bg-white/[0.07] transition-all duration-500 hover:border-white/15 overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-0 ${cat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                {/* Icon */}
                <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Text */}
                <h3 className="relative z-10 text-sm lg:text-base font-semibold text-white mb-1 text-center">
                  {cat.name}
                </h3>
                <span className="relative z-10 text-xs text-white/40 group-hover:text-white/60 transition-colors">
                  {cat.count} uygulama
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* See All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/25 rounded-full px-6 py-3 transition-all hover:bg-white/5"
          >
            Tüm Kategorileri Gör
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
