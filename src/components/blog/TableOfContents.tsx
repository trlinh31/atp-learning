import { cn } from "@/lib/utils";

export type TocHeading = {
  id: string;
  label: string;
};

interface TableOfContentsProps {
  headings: TocHeading[];
  activeId?: string;
  onNavigate?: (id: string) => void;
}

export function TableOfContents({
  headings,
  activeId,
  onNavigate,
}: TableOfContentsProps) {
  if (!headings.length) return null;

  return (
    <div className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 mb-4">
        Table of Contents
      </p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              className={cn(
                "w-full text-left rounded-2xl px-3 py-2 transition-colors",
                activeId === heading.id
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted/70"
              )}
              onClick={() => onNavigate?.(heading.id)}
            >
              {heading.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
