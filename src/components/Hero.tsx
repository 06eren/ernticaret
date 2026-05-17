"use client"

import { motion } from "framer-motion"
import { ArrowRight, Store, Search } from "lucide-react"
import Link from "next/link"

function LaptopMockup() {
  return (
    <div className="relative w-[420px] sm:w-[540px] lg:w-[640px]">
      {/* Laptop Body */}
      <div className="rounded-t-xl bg-[#2d1044] border border-white/10 p-2 shadow-2xl shadow-purple-900/40">
        {/* Screen */}
        <div className="rounded-lg bg-gradient-to-br from-[#1a0a2e] to-[#2d1044] overflow-hidden aspect-[16/10]">
          {/* Fake App Store UI */}
          <div className="p-3 h-full flex flex-col">
            {/* Top bar */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-rose-400" />
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 h-4 rounded-full bg-white/5 mx-4" />
            </div>
            {/* Hero banner inside */}
            <div className="rounded-lg bg-gradient-to-r from-rose-600/40 to-fuchsia-600/40 p-3 mb-3">
              <div className="h-2 w-20 rounded-full bg-white/40 mb-1.5" />
              <div className="h-1.5 w-32 rounded-full bg-white/20" />
            </div>
            {/* App grid */}
            <div className="grid grid-cols-4 gap-2 flex-1">
              {[
                "from-rose-500 to-pink-600",
                "from-fuchsia-500 to-purple-600",
                "from-purple-500 to-violet-600",
                "from-violet-500 to-indigo-600",
                "from-pink-500 to-rose-600",
                "from-purple-400 to-fuchsia-500",
                "from-rose-400 to-pink-500",
                "from-fuchsia-400 to-violet-500",
              ].map((gradient, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 + i * 0.08, duration: 0.4 }}
                  className={`rounded-lg bg-gradient-to-br ${gradient} aspect-square`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Laptop Base */}
      <div className="h-3 bg-[#2d1044] border-x border-b border-white/10 rounded-b-sm mx-8" />
      <div className="h-1.5 bg-[#2d1044]/80 border border-white/5 rounded-b-xl mx-2" />
    </div>
  )
}

function PhoneMockup() {
  return (
    <div className="relative w-[180px] sm:w-[220px]">
      {/* Phone Frame */}
      <div className="rounded-[20px] bg-[#2d1044] border border-white/10 p-1.5 shadow-2xl shadow-purple-900/40">
        <div className="rounded-[16px] bg-gradient-to-br from-[#1a0a2e] to-[#2d1044] overflow-hidden aspect-[9/19]">
          {/* Notch */}
          <div className="mx-auto mt-1 w-12 h-3 bg-[#2d1044] rounded-full" />
          {/* Content */}
          <div className="p-2 flex flex-col gap-2 mt-2">
            {/* Search bar */}
            <div className="h-5 rounded-full bg-white/5" />
            {/* App items */}
            {[
              "from-rose-500 to-pink-600",
              "from-fuchsia-500 to-purple-600",
              "from-purple-500 to-violet-600",
            ].map((gradient, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.12, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${gradient} shrink-0`} />
                <div className="flex-1">
                  <div className="h-1.5 w-14 rounded-full bg-white/30 mb-1" />
                  <div className="h-1 w-10 rounded-full bg-white/10" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/12662100_1280_720_30fps.mp4" type="video/mp4" />
        </video>
        {/* Hafif overlay - yazılar okunsun ama video da görünsün */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a2e]/70 via-[#1a0a2e]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e]/30 via-transparent to-[#1a0a2e]/80" />
      </div>

      {/* Content - Split Layout */}
      <div className="relative z-10 w-full min-h-screen flex items-center pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full">

          {/* Sol: Yazılar */}
          <div className="pl-6 sm:pl-12 lg:pl-20 xl:pl-28 pr-6">
            {/* Overline */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base font-semibold uppercase tracking-[0.3em] text-[var(--color-accent-light)] mb-5"
            >
              Dijital Pazarın Yeni Adresi
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="leading-[1.08] mb-6"
            >
              <span className="block text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] font-extralight tracking-tight text-white">
                Hayal Et.
              </span>
              <span className="block text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tight bg-gradient-to-r from-[var(--color-primary-light)] via-[var(--color-secondary)] to-[var(--color-accent-light)] bg-clip-text text-transparent animate-gradient">
                Bul. Sahip Ol.
              </span>
            </motion.h1>

            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-16 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full mb-6"
            />

            {/* Description - daha okunur renkler */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="max-w-lg text-xl sm:text-2xl font-normal text-white/80 leading-relaxed mb-12"
            >
              İşletmelerin sunduğu binlerce profesyonel yazılımı keşfet. Ya da kendi uygulamanı vitrinde yerini alsın.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/apps"
                className="group relative flex items-center justify-center gap-3 rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#1a0a2e] overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20 active:scale-[0.97]"
              >
                <Search className="h-5 w-5" />
                Uygulamaları Keşfet
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/business/register"
                className="group flex items-center justify-center gap-3 rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:border-white/50 hover:bg-white/5 transition-all hover:scale-105 active:scale-[0.97]"
              >
                <Store className="h-5 w-5 text-[var(--color-accent-light)]" />
                Satıcı Ol
              </Link>
            </motion.div>
          </div>

          {/* Sağ: Mockup'lar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="relative flex items-end justify-center lg:justify-center lg:pr-16 xl:pr-24"
          >
            {/* Laptop */}
            <div className="animate-float-gentle">
              <LaptopMockup />
            </div>
            {/* Phone - laptop üstüne binecek */}
            <div className="absolute right-8 sm:right-12 lg:right-16 xl:right-24 bottom-0 animate-float-gentle-delayed z-10">
              <PhoneMockup />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
    </section>
  )
}
