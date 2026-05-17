"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoriesFromServer } from "@/lib/api";

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
    <section className="w-full max-w-[1600px] mx-auto px-4 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-medium text-[#1A0A10] mb-2" style={{fontFamily: 'var(--font-playfair)'}}>
          Featured Categories
        </h2>
        <Link
          href="/category/16167"
          className="inline-block text-xs font-bold tracking-widest uppercase text-[#8D6E7F] hover:text-[#C2185B] transition-colors border-b border-transparent hover:border-[#C2185B] pb-0.5"
        >
          Discover All Categories
        </Link>
      </div>

      <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 gap-6 snap-x hide-scrollbar">
        {loading && categories.length === 0
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div key={`cat-skeleton-${idx}`} className="flex flex-col items-center flex-shrink-0 snap-start">
                <div className="w-[260px] md:w-[340px] aspect-square rounded-[2rem] bg-[#F7F5F2] animate-pulse mb-6 shadow-sm" />
                <div className="h-4 bg-[#F7F5F2] animate-pulse w-32 rounded" />
              </div>
            ))
          : categories.map((cat) => (
          <Link key={cat.id} href={`/category/${cat.id}`} className="group flex flex-col items-center flex-shrink-0 snap-start">
            <div className="relative w-[260px] md:w-[340px] aspect-square rounded-[2rem] bg-[#FDF6F8] overflow-hidden mb-6 shadow-sm group-hover:shadow-[0_10px_30px_-10px_rgba(194,24,91,0.15)] transition-all duration-500 transform group-hover:-translate-y-2 border border-[#F7F5F2]">
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#8D6E7F] bg-[#FDF6F8]">
                  <span className="text-xl font-bold tracking-[0.2em] uppercase opacity-40">{cat.name.slice(0, 2)}</span>
                </div>
              )}
              {/* Overlay gradient for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A10]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="text-sm md:text-base font-bold tracking-[0.15em] uppercase text-center text-[#1A0A10] group-hover:text-[#C2185B] transition-colors">
              {cat.name}
            </h3>
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
