"use client"

import { useActionState, useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  AtSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  KeyRound,
  Loader2,
  User,
  Users,
  MapPin,
  Map,
  Signpost,
} from "lucide-react"
import { registerBuyer, type AuthActionState } from "@/app/actions/auth"
import { isValidTurkishMobile } from "@/lib/phone"
import AuthInput from "./AuthInput"
import AuthPhoneInput from "./AuthPhoneInput"
import AuthSelect from "./AuthSelect"

const initialState: AuthActionState = {}

interface AddressItem {
  id: number
  name: string
}

const STEPS = [
  { id: 1, title: "Hesap", desc: "Giriş bilgileri" },
  { id: 2, title: "Profil", desc: "Kişisel bilgiler" },
  { id: 3, title: "Adres", desc: "İletişim adresi" },
]

const genderOptions = [
  { value: "MALE", label: "Erkek" },
  { value: "FEMALE", label: "Kadın" },
  { value: "OTHER", label: "Diğer" },
  { value: "PREFER_NOT_TO_SAY", label: "Belirtmek istemiyorum" },
]

export default function BuyerRegisterForm() {
  const [step, setStep] = useState(1)
  const [phoneDigits, setPhoneDigits] = useState("")
  const [stepError, setStepError] = useState<string | null>(null)
  const [state, formAction, pending] = useActionState(registerBuyer, initialState)

  const [formDataState, setFormDataState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    fullName: "",
    birthDate: "",
    gender: "",
    province: "",
    provinceId: "",
    district: "",
    districtId: "",
    neighborhood: "",
    neighborhoodId: "",
    street: "",
    addressDetail: "",
  })

  // Address API states
  const [provinces, setProvinces] = useState<AddressItem[]>([])
  const [districts, setDistricts] = useState<AddressItem[]>([])
  const [neighborhoods, setNeighborhoods] = useState<AddressItem[]>([])
  const [loadingProvinces, setLoadingProvinces] = useState(false)
  const [loadingDistricts, setLoadingDistricts] = useState(false)
  const [loadingNeighborhoods, setLoadingNeighborhoods] = useState(false)

  // Fetch provinces on mount
  useEffect(() => {
    async function fetchProvinces() {
      setLoadingProvinces(true)
      try {
        const res = await fetch("https://api.turkiyeapi.dev/v2/provinces")
        if (res.ok) {
          const json = await res.json()
          const sorted = (json.data as AddressItem[]).sort((a, b) =>
            a.name.localeCompare(b.name, "tr")
          )
          setProvinces(sorted)
        }
      } catch (err) {
        console.error("İller yüklenemedi", err)
      } finally {
        setLoadingProvinces(false)
      }
    }
    fetchProvinces()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormDataState((prev) => ({ ...prev, [name]: value }))
  }

  const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provId = e.target.value
    const provName = e.target.options[e.target.selectedIndex]?.text || ""

    setFormDataState((prev) => ({
      ...prev,
      provinceId: provId,
      province: provId && provId !== "" ? provName : "",
      districtId: "",
      district: "",
      neighborhoodId: "",
      neighborhood: "",
    }))
    setDistricts([])
    setNeighborhoods([])

    if (!provId) return

    setLoadingDistricts(true)
    try {
      const res = await fetch(`https://api.turkiyeapi.dev/v2/districts?provinceId=${provId}&limit=200`)
      if (res.ok) {
        const json = await res.json()
        const sorted = (json.data as AddressItem[]).sort((a, b) =>
          a.name.localeCompare(b.name, "tr")
        )
        setDistricts(sorted)
      }
    } catch (err) {
      console.error("İlçeler yüklenemedi", err)
    } finally {
      setLoadingDistricts(false)
    }
  }

  const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const distId = e.target.value
    const distName = e.target.options[e.target.selectedIndex]?.text || ""

    setFormDataState((prev) => ({
      ...prev,
      districtId: distId,
      district: distId && distId !== "" ? distName : "",
      neighborhoodId: "",
      neighborhood: "",
    }))
    setNeighborhoods([])

    if (!distId) return

    setLoadingNeighborhoods(true)
    try {
      const res = await fetch(`https://api.turkiyeapi.dev/v2/neighborhoods?districtId=${distId}&limit=500`)
      if (res.ok) {
        const json = await res.json()
        const sorted = (json.data as AddressItem[]).sort((a, b) =>
          a.name.localeCompare(b.name, "tr")
        )
        setNeighborhoods(sorted)
      }
    } catch (err) {
      console.error("Mahalleler yüklenemedi", err)
    } finally {
      setLoadingNeighborhoods(false)
    }
  }

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const neighId = e.target.value
    const neighName = e.target.options[e.target.selectedIndex]?.text || ""

    setFormDataState((prev) => ({
      ...prev,
      neighborhoodId: neighId,
      neighborhood: neighId && neighId !== "" ? neighName : "",
    }))
  }

  const concatenatedAddress = [
    formDataState.province ? `${formDataState.province} İli` : "",
    formDataState.district ? `${formDataState.district} İlçesi` : "",
    formDataState.neighborhood ? `${formDataState.neighborhood} Mah.` : "",
    formDataState.street ? `${formDataState.street} Sk./Cd.` : "",
    formDataState.addressDetail ? `(${formDataState.addressDetail})` : "",
  ]
    .filter(Boolean)
    .join(", ")

  const canGoNext = step < 3
  const canGoBack = step > 1

  function handleNext(e: React.MouseEvent) {
    e.preventDefault()
    setStepError(null)

    if (step === 1) {
      if (!formDataState.username || formDataState.username.trim().length < 3) {
        setStepError("Kullanıcı adı en az 3 karakter olmalıdır.")
        return
      }
      if (!formDataState.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDataState.email.trim())) {
        setStepError("Geçerli bir e-posta adresi girin.")
        return
      }
      if (!formDataState.password || formDataState.password.length < 8) {
        setStepError("Şifre en az 8 karakter olmalıdır.")
        return
      }
      if (formDataState.password !== formDataState.passwordConfirm) {
        setStepError("Şifreler eşleşmiyor.")
        return
      }
    }

    if (step === 2) {
      if (!formDataState.fullName || !formDataState.fullName.trim()) {
        setStepError("Ad soyad alanı zorunludur.")
        return
      }
      if (!isValidTurkishMobile(phoneDigits)) {
        setStepError("Telefon numarasını +90 555 555 55 55 formatında eksiksiz girin.")
        return
      }
      if (!formDataState.birthDate) {
        setStepError("Doğum tarihi zorunludur.")
        return
      }
      const bDate = new Date(formDataState.birthDate)
      if (Number.isNaN(bDate.getTime())) {
        setStepError("Geçerli bir doğum tarihi girin.")
        return
      }
      if (!formDataState.gender) {
        setStepError("Cinsiyet seçimi zorunludur.")
        return
      }
    }

    if (canGoNext) setStep((s) => s + 1)
  }

  function handleBack(e: React.MouseEvent) {
    e.preventDefault()
    if (canGoBack) setStep((s) => s - 1)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setStepError(null)

    if (!formDataState.province) {
      e.preventDefault()
      setStepError("Lütfen il seçiniz.")
      return
    }
    if (!formDataState.district) {
      e.preventDefault()
      setStepError("Lütfen ilçe seçiniz.")
      return
    }
    if (!formDataState.neighborhood) {
      e.preventDefault()
      setStepError("Lütfen mahalle seçiniz.")
      return
    }
    if (!formDataState.street || !formDataState.street.trim()) {
      e.preventDefault()
      setStepError("Lütfen cadde veya sokak bilgisini giriniz.")
      return
    }

    if (!formDataState.addressDetail || !formDataState.addressDetail.trim()) {
      e.preventDefault()
      setStepError("Lütfen açık adres/adres tarifi detayını giriniz.")
      return
    }
  }

  // Bu fonksiyon, form server'a gitmeden hemen önce araya girip 
  // silinen adımlardaki verileri state üzerinden FormData'ya zorla ekler.
  const clientAction = (formData: FormData) => {
    formData.set("username", formDataState.username)
    formData.set("email", formDataState.email)
    formData.set("password", formDataState.password)
    formData.set("passwordConfirm", formDataState.passwordConfirm)
    formData.set("fullName", formDataState.fullName)
    
    // AuthPhoneInput ayrı bir state tuttuğu için onu da ekliyoruz
    formData.set("phone", phoneDigits) 
    
    formData.set("birthDate", formDataState.birthDate)
    formData.set("gender", formDataState.gender)
    formData.set("address", concatenatedAddress)

    // Tüm veriler eklendikten sonra Server Action'ı tetikliyoruz
    formAction(formData)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--color-accent-light)]">
          Kullanıcı Kaydı
        </span>
        <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Hesap oluştur</h1>
        <p className="mt-1.5 text-sm text-white/50">
          Dijital ürünleri keşfetmek için birkaç adımda kayıt olun.
        </p>
      </motion.div>

      {/* Step indicator */}
      <div className="mb-6 flex gap-2">
        {STEPS.map((s) => (
          <div key={s.id} className="flex-1">
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                step >= s.id
                  ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                  : "bg-white/10"
              }`}
            />
            <p
              className={`mt-1.5 text-[10px] font-medium uppercase tracking-wider ${
                step === s.id ? "text-white/80" : "text-white/30"
              }`}
            >
              {s.title}
            </p>
          </div>
        ))}
      </div>

      {stepError && (
        <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {stepError}
        </div>
      )}

      {state.error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
        >
          {state.error}
        </motion.div>
      )}

<form action={clientAction} onSubmit={handleSubmit} autoComplete="off">        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <AuthInput
                  name="username"
                  label="Kullanıcı Adı"
                  placeholder="kullaniciadi"
                  preventAutofill
                  required
                  icon={<User className="h-4 w-4" />}
                  value={formDataState.username}
                  onChange={handleChange}
                />
              </div>
              <div className="sm:col-span-2">
                <AuthInput
                  name="email"
                  type="email"
                  label="E-Mail Adresi"
                  placeholder="mail@ornek.com"
                  autoComplete="email"
                  inputMode="email"
                  required
                  icon={<AtSign className="h-4 w-4" />}
                  value={formDataState.email}
                  onChange={handleChange}
                />
              </div>
              <AuthInput
                name="password"
                type="password"
                label="Şifre"
                placeholder="En az 8 karakter"
                autoComplete="new-password"
                required
                icon={<KeyRound className="h-4 w-4" />}
                value={formDataState.password}
                onChange={handleChange}
              />
              <AuthInput
                name="passwordConfirm"
                type="password"
                label="Şifre Tekrar"
                placeholder="Şifrenizi tekrarlayın"
                autoComplete="new-password"
                required
                icon={<KeyRound className="h-4 w-4" />}
                value={formDataState.passwordConfirm}
                onChange={handleChange}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <AuthInput
                  name="fullName"
                  label="Ad Soyad"
                  placeholder="Adınız Soyadınız"
                  autoComplete="name"
                  required
                  icon={<User className="h-4 w-4" />}
                  value={formDataState.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <AuthPhoneInput onDigitsChange={setPhoneDigits} />
              </div>
              <AuthInput
                name="birthDate"
                type="date"
                label="Doğum Tarihi"
                required
                icon={<Calendar className="h-4 w-4" />}
                value={formDataState.birthDate}
                onChange={handleChange}
              />
              <div className="sm:col-span-2">
                <AuthSelect
                  name="gender"
                  label="Cinsiyet"
                  required
                  icon={<Users className="h-4 w-4" />}
                  options={genderOptions}
                  value={formDataState.gender}
                  onChange={handleChange}
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <AuthSelect
                name="provinceId"
                label={loadingProvinces ? "İller yükleniyor..." : "İl"}
                required
                disabled={loadingProvinces || provinces.length === 0}
                icon={<MapPin className="h-4 w-4" />}
                options={provinces.map((p) => ({ value: String(p.id), label: p.name }))}
                value={formDataState.provinceId}
                onChange={handleProvinceChange}
              />

              <AuthSelect
                name="districtId"
                label={loadingDistricts ? "İlçeler yükleniyor..." : "İlçe"}
                required
                disabled={loadingDistricts || districts.length === 0 || !formDataState.provinceId}
                icon={<MapPin className="h-4 w-4" />}
                options={districts.map((d) => ({ value: String(d.id), label: d.name }))}
                value={formDataState.districtId}
                onChange={handleDistrictChange}
              />

              <div className="sm:col-span-2">
                <AuthSelect
                  name="neighborhoodId"
                  label={loadingNeighborhoods ? "Mahalleler yükleniyor..." : "Mahalle"}
                  required
                  disabled={
                    loadingNeighborhoods ||
                    neighborhoods.length === 0 ||
                    !formDataState.districtId
                  }
                  icon={<Map className="h-4 w-4" />}
                  options={neighborhoods.map((n) => ({ value: String(n.id), label: n.name }))}
                  value={formDataState.neighborhoodId}
                  onChange={handleNeighborhoodChange}
                />
              </div>

              <div className="sm:col-span-2">
                <AuthInput
                  name="street"
                  label="Cadde / Sokak"
                  placeholder="Örn: Moda Cd."
                  required
                  icon={<Signpost className="h-4 w-4" />}
                  value={formDataState.street}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/55">
                  Açık Adres / Adres Tarifi
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-3 text-white/35">
                    <Home className="h-4 w-4" />
                  </span>
                  <textarea
                    name="addressDetail"
                    required
                    rows={3}
                    placeholder="Kapı zili adı, tarif vb. detaylar..."
                    value={formDataState.addressDetail}
                    onChange={handleChange}
                    className="auth-input w-full resize-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/25 transition-all outline-none focus:border-[var(--color-primary)]/60 focus:bg-white/8 focus:ring-2 focus:ring-[var(--color-primary)]/20 hover:border-white/20"
                  />
                </div>
              </div>

              <input type="hidden" name="address" value={concatenatedAddress} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex gap-3">
          {canGoBack && (
            <motion.button
              type="button"
              onClick={handleBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-white/15 py-3 text-sm font-medium text-white/80 hover:bg-white/5"
            >
              <ChevronLeft className="h-4 w-4" />
              Geri
            </motion.button>
          )}

          {canGoNext ? (
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-[2] items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20"
            >
              Devam
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={pending}
              whileHover={{ scale: pending ? 1 : 1.02 }}
              whileTap={{ scale: pending ? 1 : 0.98 }}
              className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 disabled:opacity-60"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Kayıt Ol
            </motion.button>
          )}
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-white/45">
        Zaten hesabınız var mı?{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--color-primary-light)] hover:text-white transition-colors"
        >
          Giriş Yap
        </Link>
      </p>

      <p className="mt-3 text-center text-xs text-white/30">
        Ürün satmak mı istiyorsunuz?{" "}
        <Link href="/business/register" className="text-white/50 hover:text-white transition-colors">
          İşletme Kaydı
        </Link>
      </p>
    </div>
  )
}
