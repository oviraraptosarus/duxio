import type { Metadata, Viewport } from "next";
import { InteractiveBackground } from "@/components/background/interactive-background";
import { ExitIntentWidget } from "@/components/conversion/exit-intent-widget";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://duxio.ai"),
  title: {
    default: "Duxio | Revenue Infrastructure for Fast-Moving Businesses",
    template: "%s | Duxio",
  },
  description:
    "Duxio designs and builds revenue infrastructure that catches demand, qualifies leads, books calls, and compounds follow-up.",
  keywords: [
    "revenue systems",
    "lead automation",
    "CRM automation",
    "AI automation agency",
    "booking automation",
    "conversion infrastructure",
  ],
  openGraph: {
    title: "Duxio | Revenue Infrastructure for Fast-Moving Businesses",
    description:
      "A premium revenue systems experience for businesses losing money in the gaps between attention and action.",
    url: "https://duxio.ai",
    siteName: "Duxio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <InteractiveBackground />
        {children}
        <ExitIntentWidget />
      </body>
    </html>
  );
}
