import { InputNumberFormat } from "@react-input/number-format";
import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  jenis?: "harga";
  required?: boolean;
}

export default function Input({
  label,
  error,
  jenis,
  required,
  ...props
}: InputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="my-1 grid gap-1">
      {label && (
        <label htmlFor={props?.id} className="label-app">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {props?.type === "password" ? (
        <div className="relative w-full max-w-md">
          <input
            {...props}
            type={visible ? "text" : "password"}
            className={clsx(
              "form-input-app",
              error && "border-red-500!",
              props.className
            )}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Toggle password visibility"
          >
            {visible ? <Eye /> : <EyeClosed />}
          </button>
        </div>
      ) : jenis === "harga" ? (
        <InputNumberFormat
          {...props}
          locales="en"
          maximumFractionDigits={2}
          className={clsx(
            "form-input-app",
            error && "border-red-500!",
            props.className
          )}
        />
      ) : (
        <input
          {...props}
          className={clsx(
            "form-input-app",
            error && "border-red-500!",
            props.className
          )}
        />
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

interface InputIconType extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function InputIcon({ icon, label, error, ...props }: InputIconType) {
  return (
    <>
      {label && (
        <label htmlFor={props?.id} className="label-app">
          {label}
        </label>
      )}
      <div className="relative w-full max-w-sm">
        <input
          {...props}
          className={clsx(
            "form-input-app",
            error && "border-red-500!",
            props.className
          )}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          {icon}
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </>
  );
}

/* 
<div className="grid gap-1 my-1">
    <label htmlFor="email" className="label-app">
    email
    </label>
    <input className="form-input-app" />
</div>
 */
