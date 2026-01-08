import { WebsiteHero } from "@/components/services/website/hero-section";
import { WhoIsFor } from "@/components/services/website/who-is-for";
import { WhyMatters } from "@/components/services/website/why-matters";
import { PackagesSection } from "@/components/services/website/packages-section";
import { Differentiators } from "@/components/services/website/differentiators";
import { ProcessSection } from "@/components/services/website/process-section";
import { FAQSection } from "@/components/services/website/faq-section";
import { WebsiteCTA } from "@/components/services/website/cta-section";

export const metadata = {
    title: 'Professional Website Development | SR Digital',
    description: 'Conversion-focused website development services. We build websites that turn visitors into customers.',
}

export default function WebsiteServicePage() {
    return (
        <main className="min-h-screen">
            <WebsiteHero />
            <WhoIsFor />
            <WhyMatters />
            <PackagesSection />
            <Differentiators />
            <ProcessSection />
            <FAQSection />
            <WebsiteCTA />
        </main>
    )
}
