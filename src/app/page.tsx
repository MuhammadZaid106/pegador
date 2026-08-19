import AnouncementBar from "@/component/AnouncementBar";
import CollectionSection from "@/component/CollectionSection";
import HeroSection from "@/component/HeroSection";
import HodieSection from "@/component/HodieSection";
import HereAndNowSection from "@/component/HereAndNowSection";
import StickyOffer from "@/component/StickyOffer";
import Footer from "@/component/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <AnouncementBar />
      <HeroSection />
      <CollectionSection />
      <HodieSection />
      <HereAndNowSection />
      <Footer />
      <StickyOffer />
    </main>
  );
}
