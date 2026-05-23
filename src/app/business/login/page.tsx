import AuthShell from "@/components/auth/AuthShell"
import BusinessAuthPlaceholder from "@/components/auth/BusinessAuthPlaceholder"
import { AUTH_COPY, AUTH_VIDEOS } from "@/lib/auth-content"

export default function BusinessLoginPage() {
  return (
    <AuthShell
      mode="login"
      videoSrc={AUTH_VIDEOS.businessLogin}
      tagline={AUTH_COPY.businessLogin.tagline}
      title={AUTH_COPY.businessLogin.title}
      subtitle={AUTH_COPY.businessLogin.subtitle}
    >
      <BusinessAuthPlaceholder mode="login" />
    </AuthShell>
  )
}
