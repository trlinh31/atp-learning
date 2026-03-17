import { FormEvent, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewsletterSignupCardProps {
  className?: string;
  ctaLabel?: string;
  source?: string;
}

type SubmissionState = "idle" | "loading" | "success" | "error";

export function NewsletterSignupCard({ className, ctaLabel = "Đăng ký", source = "blog_sidebar" }: NewsletterSignupCardProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const sourceUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const timestamp = useMemo(() => new Date().toISOString(), []);
  const crmEndpoint = import.meta.env.VITE_CRM_NEWSLETTER_ENDPOINT;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (status !== "idle") {
      setStatus("idle");
      setMessage(null);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || status === "loading") return;

    if (!crmEndpoint) {
      console.error("Missing VITE_CRM_NEWSLETTER_ENDPOINT environment variable");
      setMessage("Thiếu cấu hình CRM. Vui lòng thử lại sau.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch(crmEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source,
          sourceUrl,
          timestamp,
        }),
      });

      if (!response.ok) {
        throw new Error(`CRM request failed with status ${response.status}`);
      }

      setStatus("success");
      setMessage("Đăng ký thành công! Hãy kiểm tra email của bạn.");
      setEmail("");
    } catch (error) {
      console.error("Newsletter signup failed", error);
      setStatus("error");
      setMessage("Không thể gửi đăng ký. Vui lòng thử lại trong giây lát.");
    }
  }

  return (
    <div
      className={`rounded-3xl border border-border/60 bg-secondary p-6 shadow-sm ${className ?? ""
        }`}
    >
      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary/70">
          Newsletter
        </p>
        <h3 className="text-lg font-semibold text-foreground">
          Cập nhật cơ hội thực tập & webinar độc quyền mỗi tuần.
        </h3>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(event) => handleEmailChange(event.target.value)}
          placeholder="Email trường hoặc cá nhân"
          required
        />

        {/* <p className="text-xs text-muted-foreground">
          Bằng việc đăng ký, bạn đồng ý với
          <a href="/privacy" className="ml-1 font-semibold text-primary hover:underline">
            Chính sách bảo mật
          </a>
          của ATP.
        </p> */}

        <input type="hidden" name="timestamp" value={timestamp} />
        <input type="hidden" name="sourceUrl" value={sourceUrl} />

        <Button
          type="submit"
          className="w-full rounded-full bg-primary text-white hover:bg-primary/90"
          disabled={status === "loading"}
        >
          {status === "success" ? "Đã đăng ký" : ctaLabel}
        </Button>

        {message && (
          <p
            className={`text-sm ${status === "error" ? "text-destructive" : "text-emerald-600"}`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
