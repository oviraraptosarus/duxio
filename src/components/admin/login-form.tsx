"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    }).catch(() => undefined);

    setLoading(false);

    if (!response?.ok) {
      setError("Access denied. Use the configured admin credentials.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="panel w-full max-w-md rounded-[2rem] p-6 md:p-8">
      <div className="grid size-12 place-items-center rounded-2xl border border-[var(--line)] bg-white/[0.04]">
        <LockKeyhole size={20} className="text-[var(--signal)]" />
      </div>
      <h1 className="serif mt-8 text-5xl leading-none tracking-[-0.06em] text-[var(--ink)]">Admin access</h1>
      <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">
        Protected operator surface for leads, bookings, scorecards, conversations, analytics, and system health.
      </p>
      <div className="mt-8 grid gap-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required defaultValue="admin@duxio.ai" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required placeholder="Configured password" />
        </div>
      </div>
      {error ? <p className="mt-4 text-sm text-[var(--danger)]">{error}</p> : null}
      <Button type="submit" className="mt-7 w-full" disabled={loading}>
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        Enter dashboard
      </Button>
      <p className="mt-4 text-xs leading-5 text-[var(--ink-subtle)]">
        Admin access is optional for launch. Public leads are delivered through Formspree and Calendly.
      </p>
    </form>
  );
}
