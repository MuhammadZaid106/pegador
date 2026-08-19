import AnouncementBar from "@/component/AnouncementBar";
import CollectionSection from "@/component/CollectionSection";
import HeroSection from "@/component/HeroSection";
import HodieSection from "@/component/HodieSection";
import StickyOffer from "@/component/StickyOffer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <AnouncementBar />
      <HeroSection />
      <CollectionSection />
      <HodieSection />
      <StickyOffer />
    </main>
  );
}
