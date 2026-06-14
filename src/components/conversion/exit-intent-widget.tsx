"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgkonnz";
const STORAGE_KEY = "duxio_exit_widget_seen";

export function ExitIntentWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const show = () => {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
      setOpen(true);
    };

    const timer = window.setTimeout(show, 42_000);
    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 4) show();
    };

    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("_subject", "Duxio exit-intent lead");
    formData.set("source", "exit_intent_widget");

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    }).catch(() => undefined);

    setSubmitting(false);
    if (response?.ok) {
      setSent(true);
      form.reset();
    } else {
      setError("Could not send right now. Please try again in a moment.");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/62 px-4 backdrop-blur-sm">
      <div className="premium-ring relative w-full max-w-[34rem] overflow-hidden rounded-[2rem] border border-[var(--line-strong)] bg-[#090b0e]/96 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.1)] md:p-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(244,209,155,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_44%)]" />
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="focus-visible-ring absolute right-5 top-5 rounded-full p-2 text-[var(--ink-subtle)] transition hover:bg-white/[0.06] hover:text-[var(--ink)]"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div>
            <CheckCircle2 className="text-[var(--success)]" size={28} />
            <h2 className="serif mt-5 text-3xl leading-tight tracking-[-0.04em] text-[var(--ink)]">Sent. Check your inbox soon.</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">
              We will send a short breakdown of the most likely revenue leaks and what to fix first.
            </p>
            <Button type="button" className="mt-7" onClick={() => setOpen(false)}>
              Back to site
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="mono text-[0.66rem] uppercase tracking-[0.22em] text-[var(--signal)]">Before you go</div>
            <h2 className="serif mt-4 text-3xl leading-tight tracking-[-0.04em] text-[var(--ink)] md:text-4xl">
              Want the leak checklist?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--ink-muted)]">
              Leave your email and we will send a concise breakdown of the revenue leaks most businesses miss first.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
              <Button type="submit" disabled={submitting}>
                {submitting ? "Sending" : "Send it"}
                <ArrowRight size={16} />
              </Button>
            </div>
            {error ? <p className="mt-3 text-sm text-[var(--danger)]">{error}</p> : null}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 w-full text-center text-xs text-[var(--ink-subtle)] transition hover:text-[var(--ink-muted)]"
            >
              No thanks, I will keep browsing.
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
