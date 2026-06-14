import { cn } from "@/lib/cn";

type MetricProps = {
  value: string;
  label: string;
  detail?: string;
  className?: string;
};

export function Metric({ value, label, detail, className }: MetricProps) {
  return (
    <div className={cn("rounded-3xl border border-[var(--line)] bg-white/[0.03] p-5", className)}>
      <div className="serif text-3xl leading-none tracking-[-0.035em] text-[var(--ink)]">{value}</div>
      <div className="mt-3 text-sm font-medium text-[var(--ink)]">{label}</div>
      {detail ? <div className="mt-2 text-xs leading-5 text-[var(--ink-subtle)]">{detail}</div> : null}
    </div>
  );
}
