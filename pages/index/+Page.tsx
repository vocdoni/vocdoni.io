import { useIsClient } from "@/lib/useIsClient";
import { useUrlSync } from "@/lib/useUrlSync";
import { StaticFallback } from "@/components/StaticFallback";
import { Navigation } from "@/components/Navigation";
import { SectionScroller } from "@/components/SectionScroller";
import { Technology } from "./sections/Technology";
import { Services } from "./sections/Services";
import { Product } from "./sections/Product";
import { Contact } from "./sections/Contact";

export default function Page() {
  const isClient = useIsClient();
  const { activeSection, navigateToSection } = useUrlSync();

  const handleNavigation = (sectionIndex: number) => {
    navigateToSection(sectionIndex);
  };

  if (!isClient) {
    // SSR fallback: static rendering
    return <StaticFallback activeSection={activeSection} onNavigate={handleNavigation} />;
  }

  return (
    <>
      <Navigation activeSection={activeSection} onNavigate={handleNavigation} />
      <SectionScroller activeSection={activeSection} onSectionChange={handleNavigation}>
        <Technology />
        <Services />
        <Product />
        <Contact />
      </SectionScroller>
    </>
  );
}
