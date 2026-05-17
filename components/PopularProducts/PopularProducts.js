"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getBestSellers, getCampaigns } from "@/lib/api";
import { transformProduct, buildCampaignDiscountMap } from "@/lib/transformProduct";

export default function PopularProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getBestSellers();

        // The API may return data in response.data or response.data.data
        let rawProducts = [];
        if (Array.isArray(response?.data)) {
          rawProducts = response.data;
        } else if (Array.isArray(response?.data?.data)) {
          rawProducts = response.data.data;
        }

        if (rawProducts.length > 0) {
          let campaignMap = {};
          try {
            const campaignsRes = await getCampaigns();
            if (campaignsRes?.success && Array.isArray(campaignsRes?.campaigns?.data)) {
              const active = campaignsRes.campaigns.data.filter((c) => c?.status === "active");
              campaignMap = buildCampaignDiscountMap(active);
            }
          } catch (e) {
            console.error("Campaign fetch error:", e);
          }

          const apiProducts = rawProducts
            .slice(0, 8)
            .map((p) => transformProduct(p, campaignMap));
          setProducts(apiProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="products" className="w-full bg-white">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-medium text-[#1A0A10] mb-2" style={{fontFamily: 'var(--font-playfair)'}}>
            Best Sellers
          </h2>
          <Link
            href="/best-sellers"
            className="inline-block text-xs font-bold tracking-widest uppercase text-[#8D6E7F] hover:text-[#C2185B] transition-colors border-b border-transparent hover:border-[#C2185B] pb-0.5"
          >
            Discover All
          </Link>
        </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16">
        {loading && products.length === 0
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div key={`best-sellers-skeleton-${idx}`} className="w-full">
                <div className="w-full aspect-[3/4] bg-[#F8F8F6] animate-pulse mb-4" />
                <div className="h-3 bg-[#F8F8F6] animate-pulse w-2/3 mb-2" />
                <div className="h-4 bg-[#F8F8F6] animate-pulse w-1/3" />
              </div>
            ))
          : products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      </div>
    </section>
  );
}
