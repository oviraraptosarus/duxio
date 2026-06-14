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
      title: "Critical revenue leakage",
      detail:
        "Your business is relying on memory, availability, and manual follow-up. The first fix should be a capture and response-speed system.",
    };
  }

  if (score <= 7) {
    return {
      title: "Useful demand, weak handoffs",
      detail:
        "Some systems exist, but they are not connected enough to protect the revenue path. The first fix should be pipeline orchestration.",
    };
  }

  return {
    title: "Strong base, compounding opportunity",
    detail:
      "The foundation is there. The next opportunity is deeper telemetry, reactivation loops, attribution, and operational optimization.",
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
                of 10
              </div>
            </div>
          </div>

          <div>
            <h3 className="serif text-2xl md:text-4xl leading-tight tracking-[-0.04em] text-[var(--ink)]">
              {result.title}
            </h3>

            <p className="mt-4 md:mt-5 text-base leading-8 text-[var(--ink-muted)]">
              {result.detail}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <a href="#book">
                  Fix this leak
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
              width: `${
                ((step + 1) / scorecardQuestions.length) * 100
              }%`,
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
          onClick={() =>
            setStep((value) => Math.max(0, value - 1))
          }
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
