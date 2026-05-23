"use client"

import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react"

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  icon?: ReactNode
  error?: string
  /** Kayıt formunda tarayıcının yanlış alan doldurmasını azaltır */
  preventAutofill?: boolean
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      label,
      icon,
      error,
      className = "",
      id,
      preventAutofill = false,
      autoComplete,
      onFocus,
      readOnly,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? props.name
    const [blockAutofill, setBlockAutofill] = useState(preventAutofill)

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-xs font-medium uppercase tracking-wider text-white/55 sm:text-[13px]"
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/35">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            readOnly={blockAutofill ? true : readOnly}
            autoComplete={preventAutofill ? "off" : autoComplete}
            autoCorrect="off"
            data-lpignore={preventAutofill ? "true" : undefined}
            data-form-type={preventAutofill ? "other" : undefined}
            onFocus={(e) => {
              if (blockAutofill) setBlockAutofill(false)
              onFocus?.(e)
            }}
            className={`auth-input w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 transition-all outline-none focus:border-[var(--color-primary)]/60 focus:bg-white/8 focus:ring-2 focus:ring-[var(--color-primary)]/20 sm:text-base ${
              icon ? "pl-11" : ""
            } ${error ? "border-rose-500/50" : "border-white/10 hover:border-white/20"} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-rose-400">{error}</p>}
      </div>
    )
  }
)

AuthInput.displayName = "AuthInput"

export default AuthInput
