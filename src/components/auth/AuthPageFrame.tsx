/** Navbar altında tam ekran; kaydırma kapalı */
export default function AuthPageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-page-root mt-16 h-[calc(100svh-4rem)] w-full overflow-hidden overscroll-none bg-[#0a0418]">
      {children}
    </div>
  )
}
