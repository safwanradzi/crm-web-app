import { GoogleAdsHero } from "@/components/services/google-ads/hero-section";
import { AdsWhoIsFor } from "@/components/services/google-ads/who-is-for";
import { AdsWhyMatters } from "@/components/services/google-ads/why-matters";
import { AdsWhatWeDo } from "@/components/services/google-ads/what-we-do";
import { AdsPackagesSection } from "@/components/services/google-ads/packages-section";
import { AdsProcessSection } from "@/components/services/google-ads/process-section";
import { AdsFAQSection } from "@/components/services/google-ads/faq-section";
import { AdsCTA } from "@/components/services/google-ads/cta-section";

export const metadata = {
    title: 'Google Ads Management | SR Digital',
    description: 'Performance-driven Google Ads management. We plan, launch, and optimize campaigns that capture high-intent buyers.',
}

export default function GoogleAdsPage() {
    return (
        <main className="min-h-screen">
            <GoogleAdsHero />
            <AdsWhoIsFor />
            <AdsWhyMatters />
            <AdsWhatWeDo />
            <AdsPackagesSection />
            <AdsProcessSection />
            <AdsFAQSection />
            <AdsCTA />
        </main>
    )
}
