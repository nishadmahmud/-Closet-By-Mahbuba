"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBannerFromServer } from "@/lib/api";

export default function PromoCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getBannerFromServer();
        if (response.success && response.banners && response.banners.length > 0) {
          // Use non-featured banners for promo cards
          const promoBanners = response.banners
            .filter((b) => b.type !== "featured" && b.status === 1)
            .slice(0, 2)
            .map((banner) => ({
              id: banner.id,
              title: banner.title || banner.description || "Shop Now",
              image: banner.image_path,
              link: banner.button_url || "/category/16167",
            }));
          if (promoBanners.length > 0) setCards(promoBanners);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading && cards.length === 0) {
    return (
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-12 py-16 md:py-24" id="promo-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={`promo-skeleton-${idx}`} className="relative w-full aspect-[4/3] md:aspect-video bg-[#F7F5F2] animate-pulse rounded-[2rem]" />
          ))}
        </div>
      </section>
    );
  }

  if (cards.length === 0) return null;

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 md:px-12 py-16 md:py-24" id="promo-section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {cards.map((card, index) => (
          <Link
            key={card.id}
            href={card.link || "/category/16167"}
            className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#F7F5F2] overflow-hidden group rounded-[2rem] shadow-sm hover:shadow-lg transition-shadow duration-500 block"
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
