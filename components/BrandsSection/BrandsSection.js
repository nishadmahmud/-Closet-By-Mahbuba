"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTopBrands } from "@/lib/api";

const BrandGrid = ({ title, brands, kicker }) => (
  <div className="mb-12 md:mb-16">
    <div className="text-center mb-10">
      <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-medium text-[#1A0A10]" style={{fontFamily: 'var(--font-playfair)'}}>
        {title}
      </h2>
      {kicker && (
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8D6E7F] mt-2">
          {kicker}
        </p>
      )}
    </div>
    <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 gap-6 hide-scrollbar justify-start md:justify-center snap-x">
      {brands.map((brand, index) => (
        <Link key={brand.id || index} href={`/brand/${brand.id}`} className="flex-shrink-0 snap-start group relative flex items-center justify-center w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-[#F7F5F2] hover:border-[#F0D9E5] hover:-translate-y-1">
          <div className="relative w-[60%] h-[60%]">
             <Image 
               src={brand.image_path || brand.image} 
               alt={brand.name} 
               fill 
               className="object-contain transition-transform duration-300 group-hover:scale-110" 
               unoptimized 
             />
          </div>
          
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-[#2D3748] text-[10px] font-bold tracking-widest uppercase whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-sm">
              {brand.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default function BrandsSection() {
  const [internationalBrands, setInternationalBrands] = useState([]);
  const [localBrands, setLocalBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getTopBrands();
        if (response.success && response.data && response.data.length > 0) {
          // In brand-empire they separated by description, let's just show all as "Top Brands" if there's no description filter needed,
          // but we'll retain the filter logic just in case it is used by closet-by-mahbuba backend.
          const international = response.data.filter((brand) => brand.description === "International");
          const bangladeshi = response.data.filter((brand) => brand.description === "Local");

          if (international.length === 0 && bangladeshi.length === 0) {
            // If descriptions aren't set, just show all top 8 brands
            setInternationalBrands(response.data.slice(0, 8));
          } else {
            setInternationalBrands(international);
            setLocalBrands(bangladeshi);
          }
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading || (internationalBrands.length === 0 && localBrands.length === 0)) {
    return null; // Keep it clean, don't show an empty section
  }

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 md:px-12 py-16 md:py-24 bg-[#FAFAFA]" id="brands">
      {localBrands.length > 0 ? (
        <>
          {internationalBrands.length > 0 && (
            <BrandGrid title="International Brands" kicker="Global houses" brands={internationalBrands} />
          )}
          <BrandGrid title="Local Brands" kicker="Homegrown favourites" brands={localBrands} />
        </>
      ) : (
        /* If just a single list of brands */
        <BrandGrid title="Featured Brands" kicker="Editor's picks" brands={internationalBrands} />
      )}
    </section>
  );
}
