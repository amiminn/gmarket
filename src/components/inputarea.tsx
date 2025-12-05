import clsx from "clsx";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function InputArea({ label, error, ...props }: InputProps) {
  return (
    <div className="my-1 grid gap-1">
      {label && (
        <label htmlFor={props?.id} className="label-app">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={clsx(
          "form-input-app",
          error && "border-red-500!",
          props.className
        )}
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
