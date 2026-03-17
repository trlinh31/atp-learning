import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqSection({ items, className }: FaqSectionProps) {
  if (!items.length) return null;

  return (
    <section
      className={`rounded-3xl border border-border/70 bg-white/90 p-6 shadow-sm ${
        className ?? ""
      }`}
    >
      <div className="mb-6 space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary/70">
          FAQ
        </p>
        <h2 className="text-2xl font-serif text-foreground">
          Câu hỏi thường gặp
        </h2>
      </div>
      <Accordion type="single" collapsible className="divide-y divide-border/60">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger className="py-4 text-left text-lg font-semibold text-foreground">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
