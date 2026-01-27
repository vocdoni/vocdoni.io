import Hero from "@/components/Hero";
import ComparisonSection from "@/components/ComparisonSection";
import Solutions from "@/components/shadcn-studio/blocks/features-section-10/solutions-section";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/shadcn-studio/blocks/cta-section-09/cta-section-09";
import AboutUs from "@/components/shadcn-studio/blocks/about-us-page-07/about-us-page-07";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();

  const comparisonOptions = [
    {
      name: "comparison.options.vocdoni.name",
      features: {
        privacySecurity: { status: "positive" as const, text: "comparison.options.vocdoni.privacySecurity" },
        remoteAccessibility: { status: "positive" as const, text: "comparison.options.vocdoni.remoteAccessibility" },
        transparency: { status: "positive" as const, text: "comparison.options.vocdoni.transparency" },
        scalability: { status: "positive" as const, text: "comparison.options.vocdoni.scalability" },
        cost: { status: "positive" as const, text: "comparison.options.vocdoni.cost" },
        sustainability: { status: "positive" as const, text: "comparison.options.vocdoni.sustainability" },
      },
      isHighlighted: true,
    },
    {
      name: "comparison.options.traditional.name",
      features: {
        privacySecurity: { status: "positive" as const, text: "comparison.options.traditional.privacySecurity" },
        remoteAccessibility: {
          status: "negative" as const,
          text: "comparison.options.traditional.remoteAccessibility",
        },
        transparency: { status: "negative" as const, text: "comparison.options.traditional.transparency" },
        scalability: { status: "negative" as const, text: "comparison.options.traditional.scalability" },
        cost: { status: "negative" as const, text: "comparison.options.traditional.cost" },
        sustainability: { status: "negative" as const, text: "comparison.options.traditional.sustainability" },
      },
    },
    {
      name: "comparison.options.otherDigital.name",
      features: {
        privacySecurity: { status: "negative" as const, text: "comparison.options.otherDigital.privacySecurity" },
        remoteAccessibility: {
          status: "positive" as const,
          text: "comparison.options.otherDigital.remoteAccessibility",
        },
        transparency: { status: "negative" as const, text: "comparison.options.otherDigital.transparency" },
        scalability: { status: "negative" as const, text: "comparison.options.otherDigital.scalability" },
        cost: { status: "negative" as const, text: "comparison.options.otherDigital.cost" },
        sustainability: { status: "positive" as const, text: "comparison.options.otherDigital.sustainability" },
      },
    },
  ];

  const featureKeys = [
    "privacySecurity",
    "remoteAccessibility",
    "transparency",
    "scalability",
    "cost",
    "sustainability",
  ];

  const featureLabels = [
    "comparison.featureLabels.0",
    "comparison.featureLabels.1",
    "comparison.featureLabels.2",
    "comparison.featureLabels.3",
    "comparison.featureLabels.4",
    "comparison.featureLabels.5",
  ];

  const aboutStatCards = [
    {
      title: t("aboutUs.statCards.votes.title"),
      description: t("aboutUs.statCards.votes.description")
    },
    {
      title: t("aboutUs.statCards.affordable.title"),
      description: t("aboutUs.statCards.affordable.description")
    },
    {
      title: t("aboutUs.statCards.turnout.title"),
      description: t("aboutUs.statCards.turnout.description")
    },
    {
      title: t("aboutUs.statCards.experience.title"),
      description: t("aboutUs.statCards.experience.description")
    }
  ];

  const aboutFeatureCards = [
    {
      title: t("aboutUs.featureCards.security.title"),
      description: t("aboutUs.featureCards.security.description")
    },
    {
      title: t("aboutUs.featureCards.compliance.title"),
      description: t("aboutUs.featureCards.compliance.description")
    },
    {
      title: t("aboutUs.featureCards.accessibility.title"),
      description: t("aboutUs.featureCards.accessibility.description")
    }
  ];

  return (
    <>
      <Hero />
      <AboutUs statCards={aboutStatCards} featureCards={aboutFeatureCards} />
      <Solutions />
      <ComparisonSection options={comparisonOptions} featureKeys={featureKeys} featureLabels={featureLabels} />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
