"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/field";

type SubmitState = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgkonnz";
const CALENDLY_URL = "https://calendly.com/duxio-ai/30min";

export function LeadForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    }).catch(() => undefined);

    if (!formspreeResponse?.ok) {
      setState("error");
      setMessage("The form could not be delivered. Try again in a moment or message Duxio directly on Instagram.");
      return;
    }

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => undefined);

    await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: payload.email, requestedPath: "diagnosis_call" }),
    }).catch(() => undefined);

    form.reset();
    setState("success");
    setMessage("You're one step away. Choose a time below and we'll identify the highest-impact bottleneck in your revenue path.");
  }

  if (state === "success") {
    return (
      <div className="panel rounded-[2rem] p-6 md:p-8">
        <CheckCircle2 size={28} className="text-[var(--success)]" />
        <h3 className="serif mt-6 text-4xl leading-none tracking-[-0.05em] text-[var(--ink)]">Diagnosis requested.</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">{message}</p>
        <Button asChild className="mt-7">
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
            Book My Diagnosis
            <ArrowRight size={16} />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel rounded-[2rem] p-6 md:p-8">
      <div className="grid gap-5">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+1 555 000 0000" autoComplete="tel" />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" required placeholder="Business name" autoComplete="organization" />
        </div>
        <div>
          <Label htmlFor="leadSource">Where demand enters now</Label>
          <Select id="leadSource" name="leadSource" required defaultValue="">
            <option value="" disabled>
              Select primary source
            </option>
            <option value="social">Instagram, TikTok, or social</option>
            <option value="website">Website or search</option>
            <option value="calls">Phone calls</option>
            <option value="referrals">Referrals</option>
            <option value="paid">Paid ads</option>
            <option value="mixed">Mixed</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="problem">What is leaking?</Label>
          <Textarea
            id="problem"
            name="problem"
            required
            placeholder="Leads going cold, missed calls, no follow-up, no attribution, manual booking..."
          />
        </div>
      </div>
      {state === "error" ? <p className="mt-5 text-sm text-[var(--danger)]">{message}</p> : null}
      <Button type="submit" disabled={state === "submitting"} size="lg" className="mt-7 w-full">
        {state === "submitting" ? <Loader2 size={16} className="animate-spin" /> : null}
        Get My Revenue Diagnosis
        <ArrowRight size={16} />
      </Button>
      <p className="mt-4 text-center text-xs leading-5 text-[var(--ink-subtle)]">
        You'll receive scheduling details immediately after submission.
      </p>
    </form>
  );
}
