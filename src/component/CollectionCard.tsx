import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface CollectionCardProps {
  title: string;
  itemCount: number;
  image: string;
  href: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  itemCount,
  image,
  href,
}) => {
  return (
    <Link href={href} className="group block text-center">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] bg-[#f4f4f4] dark:bg-neutral-900 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Title & Count */}
      <div className="mt-3.5 space-y-1 px-1">
        <h3 className="text-[13px] sm:text-[15px] font-normal text-[#111111] dark:text-white leading-snug group-hover:underline decoration-1 underline-offset-4">
          {title}
        </h3>
        <p className="text-[11px] sm:text-[12px] text-neutral-500 dark:text-neutral-400 font-light">
          {itemCount} {itemCount === 1 ? "product" : "products"}
        </p>
      </div>
    </Link>
  );
};

export default CollectionCard;
