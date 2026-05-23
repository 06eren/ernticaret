import AuthShell from "@/components/auth/AuthShell"
import BusinessAuthPlaceholder from "@/components/auth/BusinessAuthPlaceholder"
import { AUTH_COPY, AUTH_VIDEOS } from "@/lib/auth-content"

export default function BusinessRegisterPage() {
  return (
    <AuthShell
      mode="register"
      videoSrc={AUTH_VIDEOS.businessRegister}
      tagline={AUTH_COPY.businessRegister.tagline}
      title={AUTH_COPY.businessRegister.title}
      subtitle={AUTH_COPY.businessRegister.subtitle}
    >
      <BusinessAuthPlaceholder mode="register" />
    </AuthShell>
  )
}
