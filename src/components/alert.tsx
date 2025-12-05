import { Info } from "lucide-react";

export function Alert({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "danger" | "info" | "success" | "warning";
}) {
  if (type === "danger") {
    return (
      <div className="border-l-4 py-4 flex gap-2 px-4 border-red-400 rounded bg-red-100/30">
        <Info className="text-red-400" />
        {children}
      </div>
    );
  }
  if (type === "info")
    return (
      <div className="border-l-4 py-4 flex gap-2 px-4 border-sky-400 rounded bg-sky-100/30">
        <Info className="text-sky-400" />
        {children}
      </div>
    );
  if (type === "success") {
    return (
      <div className="border-l-4 py-4 flex gap-2 px-4 border-emerald-400 rounded bg-emerald-100/30">
        <Info className="text-emerald-400" />
        {children}
      </div>
    );
  }
  if (type === "warning") {
    return (
      <div className="border-l-4 py-4 flex gap-2 px-4 border-yellow-400 rounded bg-yellow-100/30">
        <Info className="text-yellow-400" />
        {children}
      </div>
    );
  } else return <div className="alert alert-warning">{children}</div>;
}
