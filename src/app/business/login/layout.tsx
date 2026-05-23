import AuthPageFrame from "@/components/auth/AuthPageFrame"

export default function BusinessLoginLayout({ children }: { children: React.ReactNode }) {
  return <AuthPageFrame>{children}</AuthPageFrame>
}
