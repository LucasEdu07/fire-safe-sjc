import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
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
      <WhyUsSection />
      <GoogleReviewsSection />
      <ContactSection />
    </main>
    <Footer />
    <BackToTopButton />
    <WhatsAppFloat />
  </>
);

export default Index;
