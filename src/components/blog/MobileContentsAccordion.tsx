import { TocHeading } from "./TableOfContents";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MobileContentsAccordionProps {
  headings: TocHeading[];
  onNavigate?: (id: string) => void;
}

export function MobileContentsAccordion({
  headings,
  onNavigate,
}: MobileContentsAccordionProps) {
  if (!headings.length) return null;

  return (
    <Accordion type="single" collapsible className="rounded-3xl border border-border/60 bg-white/80">
      <AccordionItem value="contents">
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold">
          Contents
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <ul className="space-y-2 text-sm">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  className="w-full text-left rounded-2xl px-3 py-2 text-muted-foreground hover:bg-muted/70"
                  onClick={() => onNavigate?.(heading.id)}
                >
                  {heading.label}
                </button>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
