import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, copy, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <div
        className={cn(
          "mono mb-4 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-[var(--ink-subtle)]",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-8 bg-[var(--line-strong)]" />
        {eyebrow}
      </div>
      <h2 className="serif text-balance text-3xl leading-[1.04] tracking-[-0.035em] text-[var(--ink)] md:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-[var(--ink-muted)]">{copy}</p> : null}
    </div>
  );
}
