import AuthPageFrame from "@/components/auth/AuthPageFrame"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <AuthPageFrame>{children}</AuthPageFrame>
}
