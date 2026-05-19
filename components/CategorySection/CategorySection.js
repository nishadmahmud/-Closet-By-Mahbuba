"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoriesFromServer } from "@/lib/api";

const CARD_TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1.5", "rotate-1.5"];

export default function CategorySection({ initialCategories = [] }) {
  const normalizedInitial = useMemo(
    () =>
      Array.isArray(initialCategories)
        ? initialCategories.map((cat) => ({
            id: cat.category_id,
            name: cat.name,
            image: cat.image_url || cat.image || null,
            subcategories: cat.sub_category || [],
          }))
        : [],
    [initialCategories]
  );
  const [categories, setCategories] = useState(normalizedInitial);
  const [loading, setLoading] = useState(normalizedInitial.length === 0);

  useEffect(() => {
    if (normalizedInitial.length > 0) {
      setCategories(normalizedInitial);
      setLoading(false);
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await getCategoriesFromServer();
        if (response.success && response.data && response.data.length > 0) {
          const apiCategories = response.data.map((cat) => ({
            id: cat.category_id,
            name: cat.name,
            image: cat.image_url || cat.image || null,
            subcategories: cat.sub_category || [],
          }));
          setCategories(apiCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [normalizedInitial]);

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 md:px-12 py-10 md:py-14">
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <div>
          <p
            className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C2185B] mb-1"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Browse
          </p>
          <h2
            className="text-xl md:text-2xl font-medium text-[#1A0A10]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Featured Categories
          </h2>
        </div>
        <Link
          href="/category/16167"
          className="shrink-0 text-[10px] font-bold tracking-widest uppercase text-[#8D6E7F] hover:text-[#C2185B] transition-colors border border-[#F0D9E5] rounded-full px-3 py-1.5 hover:border-[#C2185B] hover:bg-[#FDF6F8]"
        >
          View all
        </Link>
      </div>

      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 gap-3 md:gap-4 snap-x hide-scrollbar items-end">
        {loading && categories.length === 0
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={`cat-skeleton-${idx}`}
                className={`flex-shrink-0 snap-start ${CARD_TILTS[idx % CARD_TILTS.length]}`}
              >
                <div className="w-[72px] sm:w-[80px] md:w-[88px] aspect-[3/4] rounded-2xl rounded-tr-[1.75rem] bg-[#F7F5F2] animate-pulse ring-1 ring-[#F0D9E5]" />
              </div>
            ))
          : categories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className={`group flex-shrink-0 snap-start transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 ${CARD_TILTS[idx % CARD_TILTS.length]}`}
              >
                <div className="relative w-[72px] sm:w-[80px] md:w-[88px]">
                  <span
                    className="absolute -top-1 left-1/2 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-[#FDF6F8] ring-2 ring-[#F0D9E5] group-hover:ring-[#C2185B] transition-colors"
                    aria-hidden
                  />
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl rounded-tr-[1.75rem] bg-[#FDF6F8] ring-1 ring-[#F0D9E5] shadow-sm group-hover:ring-2 group-hover:ring-[#C2185B]/40 group-hover:shadow-[0_8px_20px_-8px_rgba(194,24,91,0.35)] transition-all duration-300">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FDF6F8] to-[#F0D9E5]">
                        <span
                          className="text-lg text-[#C2185B]/50"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {cat.name.slice(0, 1)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A10]/75 via-[#1A0A10]/20 to-transparent" />
                    <p
                      className="absolute bottom-0 left-0 right-0 px-1.5 pb-2 pt-6 text-center text-[8px] sm:text-[9px] font-bold uppercase leading-tight tracking-wide text-white line-clamp-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {cat.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
