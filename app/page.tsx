import HeroSection from "./components/heroSection/heroSection";
import ServicesPage from "./components/services/services";
import Gallery from "./components/gallery/gallery";
import Footer from "./components/footer/footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesPage />
      <Gallery />
      <Footer />
    </div>
  );
}

