import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "focus-visible-ring group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-medium tracking-[-0.01em] transition duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-white/18 bg-white/[0.09] text-[var(--ink)] shadow-[0_20px_60px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.26),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.13),rgba(255,255,255,0.025))] before:opacity-90 after:absolute after:inset-x-8 after:top-0 after:h-px after:-z-10 after:bg-white/55 hover:-translate-y-0.5 hover:border-[rgba(244,209,155,0.58)] hover:bg-white/[0.15] hover:shadow-[0_24px_80px_rgba(244,209,155,0.14),inset_0_1px_0_rgba(255,255,255,0.26)]",
        secondary:
          "border border-[var(--line-strong)] bg-white/[0.04] text-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md hover:-translate-y-0.5 hover:border-[var(--signal)] hover:bg-white/[0.085] hover:shadow-[0_18px_50px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.16)]",
        ghost:
          "text-[var(--ink-muted)] hover:bg-white/[0.06] hover:text-[var(--ink)]",
        copper:
          "bg-[var(--copper)] text-[#120c07] shadow-[0_16px_44px_rgba(201,123,69,0.24)] hover:bg-[var(--copper-2)]",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-12 px-5",
        lg: "h-14 px-7",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
