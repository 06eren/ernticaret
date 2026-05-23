import AuthShell from "@/components/auth/AuthShell"
import OTPVerificationForm from "@/components/auth/OTPVerificationForm"
import { AUTH_COPY, AUTH_VIDEOS } from "@/lib/auth-content"

export default function RegisterVerifyPage() {
  return (
    <AuthShell
      mode="register"
      videoSrc={AUTH_VIDEOS.buyerRegister}
      tagline={AUTH_COPY.buyerRegister.tagline}
      title={AUTH_COPY.buyerRegister.title}
      subtitle={AUTH_COPY.buyerRegister.subtitle}
    >
      <OTPVerificationForm type="register" />
    </AuthShell>
  )
}
