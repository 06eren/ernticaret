import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const COOKIE_NAME = "ern_session"

export type SessionPayload = {
  sub: string
  role: "buyer" | "business"
  username?: string
}

function getSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error("AUTH_SECRET ortam değişkeni tanımlı değil.")
  }
  return new TextEncoder().encode(secret)
}

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT({
    role: payload.role,
    username: payload.username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret())

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getSecret())
    const sub = payload.sub
    const role = payload.role as SessionPayload["role"]
    if (!sub || (role !== "buyer" && role !== "business")) return null

    return {
      sub,
      role,
      username: typeof payload.username === "string" ? payload.username : undefined,
    }
  } catch {
    return null
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

const TEMP_REGISTER_COOKIE = "ern_temp_register"
const TEMP_LOGIN_COOKIE = "ern_temp_login"

export type TempRegisterData = {
  username: string
  email: string
  passwordHash: string
  fullName: string
  phone: string
  birthDate: string
  gender: string
  address: string
}

export async function createTempRegisterSession(userData: TempRegisterData, code: string) {
  const token = await new SignJWT({
    userData,
    code,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecret())

  const cookieStore = await cookies()
  cookieStore.set(TEMP_REGISTER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  })
}

export async function getTempRegisterSession(): Promise<{ userData: TempRegisterData; code: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(TEMP_REGISTER_COOKIE)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getSecret())
    return {
      userData: payload.userData as TempRegisterData,
      code: payload.code as string,
    }
  } catch {
    return null
  }
}

export async function clearTempRegisterSession() {
  const cookieStore = await cookies()
  cookieStore.delete(TEMP_REGISTER_COOKIE)
}

export async function createTempLoginSession(userId: string, username: string, role: string, code: string) {
  const token = await new SignJWT({
    userId,
    username,
    role,
    code,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecret())

  const cookieStore = await cookies()
  cookieStore.set(TEMP_LOGIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  })
}

export async function getTempLoginSession(): Promise<{ userId: string; username: string; role: string; code: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(TEMP_LOGIN_COOKIE)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getSecret())
    return {
      userId: payload.userId as string,
      username: payload.username as string,
      role: payload.role as string,
      code: payload.code as string,
    }
  } catch {
    return null
  }
}

export async function clearTempLoginSession() {
  const cookieStore = await cookies()
  cookieStore.delete(TEMP_LOGIN_COOKIE)
}

