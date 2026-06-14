"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export function LiveStatus() {
  const router = useRouter();
  const [lastSync, setLastSync] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      router.refresh();
      setLastSync(new Date());
    }, 15_000);

    return () => window.clearInterval(interval);
  }, [router]);

  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--ink-muted)]">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--success)] opacity-40" />
        <span className="relative inline-flex size-2 rounded-full bg-[var(--success)]" />
      </span>
      <RefreshCw size={14} className="text-[var(--ink-subtle)]" />
      Live refresh every 15s
      <span className="hidden text-[var(--ink-faint)] sm:inline">Last sync {lastSync.toLocaleTimeString()}</span>
    </div>
  );
}
