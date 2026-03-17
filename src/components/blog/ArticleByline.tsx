import { format } from "date-fns";

interface ArticleBylineProps {
  authorName: string;
  authorAnchorId: string;
  updatedDate: string;
}

export function ArticleByline({
  authorName,
  authorAnchorId,
  updatedDate,
}: ArticleBylineProps) {
  const formattedDate = format(new Date(updatedDate), "MMMM d, yyyy");

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground border-b border-border/70 pb-4">
      <a
        href={`#${authorAnchorId}`}
        className="font-semibold text-foreground hover:text-primary transition-colors"
      >
        {authorName}
      </a>
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" aria-hidden />
      <span className="uppercase tracking-wide text-xs text-muted-foreground/80">
        Updated: {formattedDate}
      </span>
    </div>
  );
}
