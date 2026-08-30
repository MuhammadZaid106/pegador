import React from "react";
import CollectionCard from "@/component/CollectionCard";
import collectionsDataRaw from "@/data/collectionsData.json";

interface CollectionData {
  id: string;
  name: string;
  slug: string;
  href: string;
  category: string;
  subCategory: string;
  description: string;
  heroImage: string;
  itemCount: number;
  featured: boolean;
}

const collectionsList: CollectionData[] = collectionsDataRaw as CollectionData[];

export default function CollectionsPage() {
  return (
    <section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-8 md:px-12 max-w-screen-2xl mx-auto w-full">
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="text-[20px] sm:text-[26px] md:text-[30px] font-normal tracking-[0.18em] uppercase text-[#111111] dark:text-white">
          OUR COLLECTIONS
        </h1>
      </div>

      {/* Grid: 2 cols mobile, 4 cols tablet/laptop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
        {collectionsList.map((item) => (
          <CollectionCard
            key={item.id}
            title={item.name}
            itemCount={item.itemCount}
            image={item.heroImage}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
}
