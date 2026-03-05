import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CoverageSection from "@/components/CoverageSection";
import WhyUsSection from "@/components/WhyUsSection";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BackToTopButton from "@/components/BackToTopButton";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <CoverageSection />
      <WhyUsSection />
      <GoogleReviewsSection />
      <FAQSection />
      <ContactSection />
    </main>
    <Footer />
    <BackToTopButton />
    <WhatsAppFloat />
  </>
);

export default Index;
