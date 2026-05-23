"use client"

import { useState } from "react"
import { motion } from "framer-motion"

type AuthVideoPanelProps = {
  videoSrc: string
  title: string
  subtitle: string
  tagline?: string
}

export default function AuthVideoPanel({ videoSrc, title, subtitle, tagline }: AuthVideoPanelProps) {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <div className="relative h-full min-h-[inherit] w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1044] via-[#1a0a2e] to-[#0a0418]" />

      {videoOk && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setVideoOk(false)}
          onLoadedData={() => setVideoOk(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-[#1a0a2e]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e]/30 via-transparent to-[#1a0a2e]/35" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="relative z-10 flex h-full min-h-[inherit] flex-col items-center justify-center px-6 text-center sm:px-10 lg:px-14"
      >
        {tagline && (
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent-light)] sm:text-xs">
            {tagline}
          </p>
        )}
        <h2 className="max-w-xl text-2xl font-bold leading-[1.2] text-white sm:text-3xl lg:text-4xl xl:text-[2.65rem]">
          {title}
        </h2>
        <div className="my-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
        <p className="max-w-md text-sm leading-relaxed text-white/75 sm:text-base lg:max-w-lg lg:text-lg">
          {subtitle}
        </p>
      </motion.div>
    </div>
  )
}
