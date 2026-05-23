import AuthShell from "@/components/auth/AuthShell"
import OTPVerificationForm from "@/components/auth/OTPVerificationForm"
import { AUTH_COPY, AUTH_VIDEOS } from "@/lib/auth-content"

export default function LoginVerifyPage() {
  return (
    <AuthShell
      mode="login"
      videoSrc={AUTH_VIDEOS.buyerLogin}
      tagline={AUTH_COPY.buyerLogin.tagline}
      title={AUTH_COPY.buyerLogin.title}
      subtitle={AUTH_COPY.buyerLogin.subtitle}
    >
      <OTPVerificationForm type="login" />
    </AuthShell>
  )
}
