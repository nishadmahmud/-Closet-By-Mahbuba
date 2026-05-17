"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCampaigns } from "@/lib/api";

export default function FlashSale() {
  const isFixedDiscountType = (type) => {
    const normalized = String(type || "").toLowerCase();
    return normalized === "amount" || normalized === "fixed";
  };
  const [campaign, setCampaign] = useState(null);
  const [saleProducts, setSaleProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns();
        if (response?.success && Array.isArray(response?.campaigns?.data)) {
          const activeCampaigns = response.campaigns.data.filter(
            (c) => c?.status === "active"
          );
          if (activeCampaigns.length > 0) {
            const cam = activeCampaigns[0];
            setCampaign(cam);

            // Calculate time left from end_date
            if (cam.end_date) {
              const endDate = new Date(cam.end_date);
              const now = new Date();
              const diff = Math.max(0, endDate - now);
              setTimeLeft({
                hours: Math.floor(diff / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
              });
            } else {
              setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }

            // Transform campaign products
            const products = (cam.products || []).slice(0, 4).map((p) => {
              const mrp = Number(p.retails_price || 0);
              const discountType = String(
                p?.pivot?.discount_type || cam.discount_type || "percentage"
              ).toLowerCase();
              const discountValue = Number(p?.pivot?.discount ?? cam.discount ?? 0);
              let finalPrice = mrp;

              if (isFixedDiscountType(discountType)) {
                finalPrice = Math.max(0, mrp - discountValue);
              } else {
                finalPrice = Math.max(0, Math.round(mrp * (1 - discountValue / 100)));
              }

              const images =
                Array.isArray(p.image_paths) && p.image_paths.length > 0
                  ? p.image_paths
                  : [p.image_path].filter(Boolean);

              return {
                id: p.id,
                name: p.name,
                brand: p.brand_name || p.brands?.name || "CLOSET BY MAHBUBA",
                originalPrice: mrp,
                salePrice: finalPrice,
                image: images[0] || "",
              };
            });
            setSaleProducts(products);
          }
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Don't render if no active campaigns
  if (!campaign && saleProducts.length === 0) {
    return null;
  }

  const campaignTitle = campaign?.title || "Private Sale";
  const discountText = campaign?.discount
    ? `Up to ${campaign.discount}${isFixedDiscountType(campaign.discount_type) ? "৳" : "%"} Off`
    : "Up to 50% Off";

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 md:px-12 py-16 md:py-24">
      <div className="bg-[#FDF6F8] flex flex-col lg:flex-row relative rounded-3xl overflow-hidden shadow-sm">
        {/* Left Side */}
        <div className="flex-1 p-8 md:p-12 lg:p-20 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-[#C2185B] text-[10px] font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 bg-[#C2185B] animate-pulse"></span>
            {campaignTitle}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1A0A10] mb-4 leading-[1.1] tracking-tight uppercase" style={{fontFamily: 'var(--font-playfair)'}}>
            {discountText}<br />Selected Styles
          </h2>
          <p className="text-[#8D6E7F] mb-10 max-w-md text-sm leading-relaxed">
            Exclusive access to our archive sale. Limited quantities available.
          </p>

          {/* Countdown */}
          <div className="flex items-center gap-6 mb-10">
            {[
              { val: timeLeft.hours, label: "Hrs" },
              { val: timeLeft.minutes, label: "Min" },
              { val: timeLeft.seconds, label: "Sec" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm ${
                      i === 2
                        ? "bg-[#C2185B] text-white"
                        : "bg-white text-[#1A0A10]"
                    }`}
                  >
                    {String(unit.val).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] text-[#1A0A10] mt-3 font-bold uppercase tracking-widest">
                    {unit.label}
                  </span>
                </div>
                {i < 2 && <span className="text-2xl font-bold text-[#1A0A10] -mt-6">:</span>}
              </div>
            ))}
          </div>

          <Link
            href="/category/16167"
            className="bg-[#1A0A10] text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#C2185B] hover:shadow-md transition-all w-fit rounded-full"
          >
            Explore Collection
          </Link>
        </div>

        {/* Right Side: Products */}
        <div className="lg:w-5/12 bg-white p-6 md:p-12 flex items-center justify-center rounded-l-3xl shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] z-10">
          <div className="w-full space-y-4">
            {saleProducts.slice(0, 2).map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="group flex items-center gap-6 p-4 rounded-2xl hover:shadow-md bg-white transition-all hover:-translate-y-0.5"
              >
                <div className="w-24 h-32 bg-[#F7F5F2] rounded-xl relative overflow-hidden shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-[#8D6E7F] tracking-widest uppercase font-bold">
                    {product.brand === "CLOSET BY MAHBUBA" ? "CLOSET BY MAHBUBA" : product.brand}
                  </span>
                  <h4 className="text-[#1A0A10] font-medium text-xs leading-relaxed mb-2 line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[#C2185B] font-bold text-sm">
                      ৳{product.salePrice.toLocaleString()}
                    </span>
                    {product.originalPrice > product.salePrice && (
                      <span className="text-[#8D6E7F] text-xs line-through">
                        ৳{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
