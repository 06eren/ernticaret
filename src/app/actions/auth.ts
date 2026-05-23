"use server"

import { redirect } from "next/navigation"
import { Gender } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { hashPassword, verifyPassword } from "@/lib/password"
import {
  createSession,
  createTempRegisterSession,
  getTempRegisterSession,
  clearTempRegisterSession,
  createTempLoginSession,
  getTempLoginSession,
  clearTempLoginSession,
} from "@/lib/session"
import { toTurkishE164 } from "@/lib/phone"
import { sendVerificationCodeEmail } from "@/lib/mail"

export type AuthActionState = {
  error?: string
  success?: string
}

function parseGender(value: string): Gender | null {
  const map: Record<string, Gender> = {
    MALE: Gender.MALE,
    FEMALE: Gender.FEMALE,
    OTHER: Gender.OTHER,
    PREFER_NOT_TO_SAY: Gender.PREFER_NOT_TO_SAY,
    Erkek: Gender.MALE,
    Kadın: Gender.FEMALE,
    Diğer: Gender.OTHER,
    "Belirtmek istemiyorum": Gender.PREFER_NOT_TO_SAY,
  }
  return map[value] ?? null
}

export async function registerBuyer(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const username = String(formData.get("username") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "")
  const fullName = String(formData.get("fullName") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const birthDateRaw = String(formData.get("birthDate") ?? "")
  const genderRaw = String(formData.get("gender") ?? "")
  const address = String(formData.get("address") ?? "").trim()

  if (!username || username.length < 3) {
    return { error: "Kullanıcı adı en az 3 karakter olmalıdır." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Geçerli bir e-posta adresi girin." }
  }
  if (password.length < 8) {
    return { error: "Şifre en az 8 karakter olmalıdır." }
  }
  if (password !== passwordConfirm) {
    return { error: "Şifreler eşleşmiyor." }
  }
  if (!fullName) return { error: "Ad soyad zorunludur." }
  
  const phoneE164 = toTurkishE164(phone)
  if (!phoneE164) {
    return {
      error: "Geçerli bir telefon girin. Örnek: +90 555 555 55 55 (başında 0 olmadan).",
    }
  }
  if (!birthDateRaw) return { error: "Doğum tarihi zorunludur." }
  const gender = parseGender(genderRaw)
  if (!gender) return { error: "Cinsiyet seçimi zorunludur." }
  if (!address) return { error: "Ev adresi zorunludur." }

  const birthDate = new Date(birthDateRaw)
  if (Number.isNaN(birthDate.getTime())) {
    return { error: "Geçerli bir doğum tarihi girin." }
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  })
  if (existing) {
    return {
      error:
        existing.username === username
          ? "Bu kullanıcı adı zaten kullanılıyor."
          : "Bu e-posta adresi zaten kayıtlı.",
    }
  }

  const passwordHash = await hashPassword(password)
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

  console.log(`\n==========================================`)
  console.log(`[DEV] Kayit OTP Kodu (${email}): ${otpCode}`)
  console.log(`==========================================\n`)

  try {
    await sendVerificationCodeEmail(email, otpCode, "register")
  } catch (err: any) {
    console.error("Kayıt e-postası gönderme hatası:", err)
    return {
      error: `Doğrulama e-postası gönderilemedi: ${err?.message ?? "Bilinmeyen hata"}. Terminalde OTP kodu: ${otpCode}`,
    }
  }

  await createTempRegisterSession(
    {
      username,
      email,
      passwordHash,
      fullName,
      phone: phoneE164,
      birthDate: birthDate.toISOString(),
      gender,
      address,
    },
    otpCode
  )

  redirect("/register/verify")
}

export async function verifyRegister(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const code = String(formData.get("code") ?? "").trim()
  if (!code || code.length !== 6) {
    return { error: "Lütfen 6 haneli doğrulama kodunu girin." }
  }

  const tempSession = await getTempRegisterSession()
  if (!tempSession) {
    return { error: "Doğrulama süresi dolmuş veya geçersiz. Lütfen tekrar kayıt olun." }
  }

  if (tempSession.code !== code) {
    return { error: "Girdiğiniz doğrulama kodu hatalı." }
  }

  const { userData } = tempSession

  try {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ username: userData.username }, { email: userData.email }] },
    })
    if (existing) {
      return { error: "Bu kullanıcı adı veya e-posta adresi zaten kullanımda." }
    }

    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        passwordHash: userData.passwordHash,
        fullName: userData.fullName,
        phone: userData.phone,
        birthDate: new Date(userData.birthDate),
        gender: userData.gender as Gender,
        address: userData.address,
      },
    })

    await createSession({
      sub: String(user.id),
      role: "buyer",
      username: user.username,
    })

    await clearTempRegisterSession()
  } catch (err) {
    console.error("Kayıt tamamlanamadı:", err)
    return { error: "Kayıt işlemi tamamlanırken hata oluştu. Lütfen tekrar deneyin." }
  }

  // UYARI: redirect() mutlaka try-catch bloğunun DIŞINDA olmalıdır!
  redirect("/")
}

export async function loginBuyer(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const username = String(formData.get("username") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")

  if (!username || !email || !password) {
    return { error: "Giriş bilgileri ve şifre zorunludur." }
  }

  const user = await prisma.user.findFirst({
    where: {
      username,
      email,
    },
  })

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Giriş bilgileri veya şifre hatalı." }
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

  console.log(`\n==========================================`)
  console.log(`[DEV] Giris OTP Kodu (${user.email}): ${otpCode}`)
  console.log(`==========================================\n`)

  try {
    await sendVerificationCodeEmail(user.email, otpCode, "login")
  } catch (err: any) {
    console.error("Giriş e-postası gönderme hatası:", err)
    return {
      error: `Doğrulama e-postası gönderilemedi: ${err?.message ?? "Bilinmeyen hata"}. Terminalde OTP kodu: ${otpCode}`,
    }
  }

  await createTempLoginSession(String(user.id), user.username, "buyer", otpCode)

  redirect("/login/verify")
}

export async function verifyLogin(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const code = String(formData.get("code") ?? "").trim()
  if (!code || code.length !== 6) {
    return { error: "Lütfen 6 haneli doğrulama kodunu girin." }
  }

  const tempSession = await getTempLoginSession()
  if (!tempSession) {
    return { error: "Giriş doğrulama süresi dolmuş veya geçersiz. Lütfen tekrar giriş yapın." }
  }

  if (tempSession.code !== code) {
    return { error: "Girdiğiniz doğrulama kodu hatalı." }
  }

  try {
    await createSession({
      sub: tempSession.userId,
      role: tempSession.role as "buyer" | "business",
      username: tempSession.username,
    })

    await clearTempLoginSession()
  } catch (err) {
    console.error("Giriş doğrulanamadı:", err)
    return { error: "Giriş doğrulanırken bir hata oluştu." }
  }

  // UYARI: redirect() mutlaka try-catch bloğunun DIŞINDA olmalıdır!
  redirect("/")
}

export async function logout() {
  const { clearSession } = await import("@/lib/session")
  await clearSession()
  redirect("/")
}