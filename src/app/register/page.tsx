import AuthShell from "@/components/auth/AuthShell"
import BuyerRegisterForm from "@/components/auth/BuyerRegisterForm"
import { AUTH_COPY, AUTH_VIDEOS } from "@/lib/auth-content"

export default function RegisterPage() {
  return (
    <AuthShell
      mode="register"
      videoSrc={AUTH_VIDEOS.buyerRegister}
      tagline={AUTH_COPY.buyerRegister.tagline}
      title={AUTH_COPY.buyerRegister.title}
      subtitle={AUTH_COPY.buyerRegister.subtitle}
    >
      <BuyerRegisterForm />
    </AuthShell>
  )
}
