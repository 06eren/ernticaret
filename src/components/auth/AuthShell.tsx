"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import AuthVideoPanel from "./AuthVideoPanel"

type AuthShellProps = {
  mode: "login" | "register"
  videoSrc: string
  title: string
  subtitle: string
  tagline?: string
  children: ReactNode
}

export default function AuthShell({
  mode,
  videoSrc,
  title,
  subtitle,
  tagline,
  children,
}: AuthShellProps) {
  const isLogin = mode === "login"

  const videoSection = (
    <section className="relative h-1/2 w-full shrink-0 overflow-hidden lg:h-full lg:w-1/2">
      <AuthVideoPanel
        videoSrc={videoSrc}
        title={title}
        subtitle={subtitle}
        tagline={tagline}
      />
    </section>
  )

  const formSection = (
    <section
      className={`flex h-1/2 min-h-0 w-full shrink-0 items-center justify-center overflow-hidden bg-[#0c0614] px-5 py-4 sm:px-8 lg:h-full lg:w-1/2 lg:px-14 lg:py-8 ${
        !isLogin ? "order-1 lg:order-none" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-[460px] lg:max-w-[480px]"
      >
        <div className="rounded-2xl border border-white/[0.08] bg-[#160a24]/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
          {children}
        </div>
      </motion.div>
    </section>
  )

  return (
    <div className="flex h-full w-full flex-col overflow-hidden lg:flex-row">
      {isLogin ? (
        <>
          {videoSection}
          {formSection}
        </>
      ) : (
        <>
          {formSection}
          {videoSection}
        </>
      )}
    </div>
  )
}
