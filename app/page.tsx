import HeroSection from "./components/heroSection/heroSection";
import ServicesPage from "./components/services/services";
import Gallery from "./components/gallery/gallery";
import ReviewSection from "./components/reviews/reviews";
import Footer from "./components/footer/footer";
import About from "./components/about/about"
import Events from "./components/events/events"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <About />
      <ServicesPage />
      <Gallery />
      <Events />
      <ReviewSection />
      <Footer />
    </div>
  );
}

