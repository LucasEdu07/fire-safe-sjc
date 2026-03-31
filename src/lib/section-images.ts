import heroImage from "@/assets/hero-bg.jpg";
import servicesImage from "../../images/image/image1.png";
import whyUsImage from "../../images/image/image2.png";

export type SectionImageUsage = "hero" | "editorial" | "support";

type SectionImageConfig = {
  section: "hero" | "services" | "why-us";
  imageSrc: string;
  alt: string;
  usage: SectionImageUsage;
};

export const sectionImages: Record<SectionImageConfig["section"], SectionImageConfig> = {
  hero: {
    section: "hero",
    imageSrc: heroImage,
    alt: "Profissional realizando inspeção de segurança contra incêndio em edifício corporativo",
    usage: "hero",
  },
  services: {
    section: "services",
    imageSrc: servicesImage,
    alt: "Técnico realizando inspeção de extintor em corredor corporativo",
    usage: "editorial",
  },
  "why-us": {
    section: "why-us",
    imageSrc: whyUsImage,
    alt: "Consultor técnico apresentando planta e cronograma para cliente em reunião",
    usage: "editorial",
  },
};
