import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CalloutTone = "tip" | "warning" | "info";

interface CalloutBoxProps {
  tone?: CalloutTone;
  title: string;
  body: ReactNode;
}

const toneStyles: Record<CalloutTone, string> = {
  tip: "bg-success/5 border-success/30 text-success",
  warning: "bg-accent/10 border-accent/40 text-accent-foreground",
  info: "bg-secondary border-secondary-foreground/10 text-foreground",
};

export function CalloutBox({ tone = "info", title, body }: CalloutBoxProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-6 py-5 shadow-sm",
        toneStyles[tone]
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-wide mb-1">
        {title}
      </p>
      <div className="text-base leading-relaxed text-foreground/90">{body}</div>
    </div>
  );
}
