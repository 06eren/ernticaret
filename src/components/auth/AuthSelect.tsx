"use client"

import { forwardRef, type SelectHTMLAttributes, type ReactNode } from "react"

type AuthSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  icon?: ReactNode
  options: { value: string; label: string }[]
}

const AuthSelect = forwardRef<HTMLSelectElement, AuthSelectProps>(
  ({ label, icon, options, className = "", id, ...props }, ref) => {
    const selectId = id ?? props.name

    return (
      <div className="space-y-1.5">
        <label htmlFor={selectId} className="block text-xs font-medium uppercase tracking-wider text-white/55">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-white/35">
              {icon}
            </span>
          )}
          <select
            ref={ref}
            id={selectId}
            className={`w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-all outline-none focus:border-[var(--color-primary)]/60 focus:bg-white/8 focus:ring-2 focus:ring-[var(--color-primary)]/20 hover:border-white/20 ${
              icon ? "pl-10" : ""
            } ${className}`}
            {...props}
          >
            <option value="" className="bg-[#1a0a2e] text-white/50">
              Seçiniz
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#1a0a2e]">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
)

AuthSelect.displayName = "AuthSelect"

export default AuthSelect
