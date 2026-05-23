import AuthShell from "@/components/auth/AuthShell"
import BuyerLoginForm from "@/components/auth/BuyerLoginForm"
import { AUTH_COPY, AUTH_VIDEOS } from "@/lib/auth-content"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>
}) {
  const params = await searchParams
  const registered = params.registered === "1"

  return (
    <AuthShell
      mode="login"
      videoSrc={AUTH_VIDEOS.buyerLogin}
      tagline={AUTH_COPY.buyerLogin.tagline}
      title={AUTH_COPY.buyerLogin.title}
      subtitle={AUTH_COPY.buyerLogin.subtitle}
    >
      <BuyerLoginForm registered={registered} />
    </AuthShell>
  )
}
