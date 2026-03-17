import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InternshipSearchPodProps {
  className?: string;
}

const highlights = [
  "120+ vị trí thực tập đang tuyển",
  "Ưu tiên ngành học & visa 408/485",
];

export function InternshipSearchPod({ className }: InternshipSearchPodProps) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-[#9fd8e5]/60 bg-[#d9f4ff] p-6 shadow-xl",
        "text-slate-900",
        "bg-gradient-to-br from-[#d9f4ff] via-[#c8eff5] to-[#bff0ea]",
        className
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-600">
        Internship Search
      </p>
      <h3 className="mt-3 text-2xl font-serif leading-snug text-[#014159]">
        Bước tiếp theo trên con đường sự nghiệp của bạn
      </h3>
      {/* <p className="mt-3 text-sm text-[#0b5568]/80">
        Bộ lọc thông minh của ATP cập nhật hằng tuần, phù hợp nhu cầu ngành học,
        visa và thời gian nhận offer.
      </p> */}

      {/* <ul className="mt-4 space-y-2 text-sm text-[#014159]">
        {highlights.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="h-1.5 w-1.5 translate-y-[9px] rounded-full bg-[#0ca5b0]" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul> */}

      <Button
        asChild
        className="mt-6 w-full rounded-full bg-[#0ca5b0] text-white hover:bg-[#08919b]"
      >
        <a href="/intern-jobs">Khám phá ngay</a>
      </Button>
    </div>
  );
}
