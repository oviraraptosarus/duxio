import { ConversionSection } from "@/components/sections/conversion-section";
import { FaqSection } from "@/components/sections/faq-section";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { LeaksSection } from "@/components/sections/leaks-section";
import { MethodSection } from "@/components/sections/method-section";
import { ProofSection } from "@/components/sections/proof-section";
import { ScorecardSection } from "@/components/sections/scorecard-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SiteHeader } from "@/components/layout/site-header";
import { SystemSection } from "@/components/sections/system-section";
import { TrustSection } from "@/components/sections/trust-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <LeaksSection />
        <SystemSection />
        <MethodSection />
        <ServicesSection />
        <ProofSection />
        <ScorecardSection />
        <TrustSection />
        <ConversionSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
