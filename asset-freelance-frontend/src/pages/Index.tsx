import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HighlightCards from "@/components/HighlightCards";
import CompletedServices from "@/components/CompletedServices";
import SatisfactionSurvey from "@/components/SatisfactionSurvey";
import Footer from "@/components/Footer";
import NewsSection from "@/components/NewsSection";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <HeroSection />
      <HighlightCards />
      {/* <CompletedServices /> */}
      <NewsSection />
      <SatisfactionSurvey />
    </main>
    <Footer />
  </div>
);

export default Index;
