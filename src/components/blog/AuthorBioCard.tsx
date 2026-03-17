import { Button } from "@/components/ui/button";

interface AuthorBioCardProps {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  className?: string;
}

export function AuthorBioCard({
  id,
  name,
  role,
  bio,
  image,
  linkedin,
  className,
}: AuthorBioCardProps) {
  return (
    <section
      id={id}
      className={`rounded-3xl border border-border/70 bg-white/90 shadow-sm p-6 flex flex-col gap-4 ${
        className ?? ""
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-2xl object-cover shadow-md"
          loading="lazy"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground/70 mb-1">
            About the author
          </p>
          <h3 className="text-xl font-serif text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="text-base text-muted-foreground leading-relaxed">{bio}</p>
      {linkedin && (
        <Button
          variant="outline"
          asChild
          className="rounded-full border-primary/30 text-primary"
        >
          <a href={linkedin} target="_blank" rel="noreferrer">
            Connect on LinkedIn
          </a>
        </Button>
      )}
    </section>
  );
}
