import { BundleHero } from "@/components/services/bundles/hero-section";
import { WhyBundling } from "@/components/services/bundles/why-bundling";
import { WhoIsFor } from "@/components/services/bundles/who-is-for";
import { PricingLogic } from "@/components/services/bundles/pricing-logic";
import { PackagesSection } from "@/components/services/bundles/packages-section";
import { ValueComparison } from "@/components/services/bundles/value-comparison";
import { ProcessSection } from "@/components/services/bundles/process-section";
import { FAQSection } from "@/components/services/bundles/faq-section";
import { CTASection } from "@/components/services/bundles/cta-section";

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Website + Ads Growth Bundles | High-Performance Digital Marketing',
    description: 'Get faster results with our integrated website and ads packages. One team, one strategy, one accountable partner for your growth.',
}

export default function BundleOffersPage() {
    return (
        <main className="min-h-screen bg-white">
            <BundleHero />
            <WhyBundling />
            <WhoIsFor />
            <PricingLogic />
            <PackagesSection />
            <ValueComparison />
            <ProcessSection />
            <FAQSection />
            <CTASection />
        </main>
    )
}
