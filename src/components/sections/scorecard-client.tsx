
"use client";

import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scorecardQuestions } from "@/lib/content";
import { cn } from "@/lib/cn";

type Answers = Record<string, number>;

function getResult(score: number) {
  if (score <= 3) {
    return {
      severity: "Critical",
      title: "Revenue leakage detected",
      issue: "Lead response and follow-up",
      impact: "High",
      recommendation: "Lead Capture & Response Automation",
      detail:
        "Your business is likely relying on manual follow-up, inconsistent response times, and disconnected communication. Leads are entering the business but some are not making it to booked conversations.",
    };
  }

  if (score <= 7) {
    return {
      severity: "Moderate",
      title: "Demand exists but handoffs are weak",
      issue: "Pipeline orchestration",
      impact: "Medium",
      recommendation: "Pipeline & Workflow Automation",
      detail:
        "You already have demand entering the business, but the systems between lead capture, qualification, and booking are creating friction and unnecessary drop-off.",
    };
  }

  return {
    severity: "Low",
    title: "Strong operating foundation",
    issue: "Optimization opportunity",
    impact: "Low",
    recommendation: "Telemetry & Reactivation Systems",
    detail:
      "Core systems appear healthy. The highest leverage opportunity is deeper attribution, reactivation loops, reporting, and operational optimization.",
  };
}

export function ScorecardClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const current = scorecardQuestions[step];

  const total = useMemo(
    () => Object.values(answers).reduce((sum, value) => sum + value, 0),
    [answers]
  );

  const result = getResult(total);

  const isComplete =
    Object.keys(answers).length === scorecardQuestions.length;

  async function submitResult() {
    setSubmitted(true);

    await fetch("/api/scorecard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score: total,
        answers,
        result: result.title,
        source: "site_scorecard",
      }),
    }).catch(() => undefined);
  }

  if (submitted) {
    return (
      <div className="panel rounded-[2rem] p-6 md:p-8">
        <div className="grid gap-6 md:gap-8 md:grid-cols-[220px_1fr] md:items-center">
          <div className="grid aspect-square place-items-center rounded-full border border-[var(--line-strong)] bg-white/[0.035]">
            <div className="text-center">
              <div className="serif text-4xl md:text-5xl leading-none tracking-[-0.06em] text-[var(--ink)]">
                {total}
              </div>

              <div className="mono mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                Leak Score
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-5">
              <div>
                <div className="mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--signal)]">
                  Leak Severity
                </div>

                <div
                  className={cn(
                    "mt-3 inline-flex rounded-full px-4 py-2 text-sm font-medium",
                    result.severity === "Critical" &&
                      "bg-red-500/10 text-red-300 border border-red-500/20",
                    result.severity === "Moderate" &&
                      "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20",
                    result.severity === "Low" &&
                      "bg-green-500/10 text-green-300 border border-green-500/20"
                  )}
                >
                  {result.severity}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-[var(--line)] p-4">
                  <div className="mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                    Primary Failure Point
                  </div>

                  <div className="mt-2 font-medium text-[var(--ink)]">
                    {result.issue}
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--line)] p-4">
                  <div className="mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                    Revenue Risk
                  </div>

                  <div className="mt-2 font-medium text-[var(--ink)]">
                    {result.impact}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[rgba(244,209,155,0.18)] bg-[rgba(244,209,155,0.05)] p-4">
                <div className="mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                  Highest-Leverage Fix
                </div>

                <div className="mt-2 font-medium text-[var(--ink)]">
                  {result.recommendation}
                </div>
              </div>

              <p className="text-base leading-8 text-[var(--ink-muted)]">
                {result.detail}
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <a href="#book">
                  Get My Revenue Audit
                  <ArrowRight size={16} />
                </a>
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => {
                  setStep(0);
                  setAnswers({});
                  setSubmitted(false);
                }}
              >
                <RotateCcw size={16} />
                Run again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel rounded-[2rem] p-6 md:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
            Question {step + 1} of {scorecardQuestions.length}
          </div>

          <div className="serif text-2xl md:text-3xl tracking-[-0.04em] text-[var(--ink)]">
            {total}/10
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-[var(--signal)] transition-all duration-500"
            style={{
              width: `${((step + 1) / scorecardQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <h3 className="text-balance text-xl font-semibold leading-7 tracking-[-0.03em] text-[var(--ink)] md:text-2xl">
        {current.question}
      </h3>

      <div className="mt-8 grid gap-3">
        {current.options.map((option) => {
          const selected = answers[current.id] === option.score;

          return (
            <button
              key={option.label}
              type="button"
              onClick={() =>
                setAnswers((value) => ({
                  ...value,
                  [current.id]: option.score,
                }))
              }
              className={cn(
                "focus-visible-ring rounded-2xl border border-[var(--line)] bg-white/[0.025] p-5 md:p-4 text-left text-sm leading-6 text-[var(--ink-muted)] transition hover:border-[var(--line-strong)] hover:bg-white/[0.055] hover:text-[var(--ink)]",
                selected &&
                  "border-[var(--signal)] bg-[rgba(244,209,155,0.18)] text-[var(--ink)] shadow-[0_0_0_1px_rgba(244,209,155,0.25)]"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          className="w-full sm:w-auto"
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
        >
          Back
        </Button>

        {step < scorecardQuestions.length - 1 ? (
          <Button
            type="button"
            className="w-full sm:w-auto"
            disabled={answers[current.id] === undefined}
            onClick={() =>
              setStep((value) =>
                Math.min(scorecardQuestions.length - 1, value + 1)
              )
            }
          >
            Next
            <ArrowRight size={16} />
          </Button>
        ) : (
          <Button
            type="button"
            className="w-full sm:w-auto"
            disabled={!isComplete}
            onClick={submitResult}
          >
            See diagnosis
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
