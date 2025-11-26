import { HeroSection } from './HeroSection';
import { SolutionsSection } from './SolutionsSection';
import { CaseStudySection } from './CaseStudySection';
import { WhyRerouteSection } from './WhyRerouteSection';
import { CTASection } from './CTASection';

export function B2BPageContainer() {
    return (
        <>
            <HeroSection />
            <SolutionsSection />
            <CaseStudySection />
            <WhyRerouteSection />
            <CTASection />
        </>
    );
}