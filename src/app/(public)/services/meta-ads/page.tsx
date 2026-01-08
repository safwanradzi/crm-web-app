import { MetaAdsHero } from "@/components/services/meta-ads/hero-section";
import { MetaWhoIsFor } from "@/components/services/meta-ads/who-is-for";
import { MetaWhyMatters } from "@/components/services/meta-ads/why-matters";
import { MetaWhatWeDo } from "@/components/services/meta-ads/what-we-do";
import { MetaPackagesSection } from "@/components/services/meta-ads/packages-section";
import { MetaProcessSection } from "@/components/services/meta-ads/process-section";
import { MetaFAQSection } from "@/components/services/meta-ads/faq-section";
import { MetaCTA } from "@/components/services/meta-ads/cta-section";

export const metadata = {
    title: 'Facebook & Instagram Ads Management | SR Digital',
    description: 'Strategic Meta Ads management designed to turn social media attention into sales and leads.',
}

export default function MetaAdsPage() {
    return (
        <main className="min-h-screen">
            <MetaAdsHero />
            <MetaWhoIsFor />
            <MetaWhyMatters />
            <MetaWhatWeDo />
            <MetaPackagesSection />
            <MetaProcessSection />
            <MetaFAQSection />
            <MetaCTA />
        </main>
    )
}
