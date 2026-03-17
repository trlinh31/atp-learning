import { Link } from "wouter";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbTrailProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbTrail({ items }: BreadcrumbTrailProps) {
  if (!items.length) return null;

  return (
    <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold">{item.label}</span>
              )}
              {!isLast && <span className="text-muted-foreground/60">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
