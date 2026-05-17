"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSlidersFromServer } from "@/lib/api";

export default function HeroBanner() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await getSlidersFromServer();
        if (response.success && response.sliders && response.sliders.length > 0) {
          const apiSlides = response.sliders
            .filter((s) => s.status === 1 && s.image_path)
            .flatMap((slider) => {
              const paths = Array.isArray(slider.image_path) ? slider.image_path : [slider.image_path];
              const productIds = Array.isArray(slider.product_id) ? slider.product_id : [slider.product_id];
              return paths.filter(Boolean).map((imgPath, index) => {
                const pId = productIds[index] || productIds[0] || null;
                return {
                  id: `${slider.id}-${index}`,
                  image: imgPath,
                  title: slider.title || "",
                  link: slider.link || (pId ? `/product/${pId}` : "#"),
                };
              });
            });
          if (apiSlides.length > 0) setSlides(apiSlides);
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[current];

  if (loading && slides.length === 0) {
    return (
    <div className="relative z-0 w-full px-4 pt-4 pb-6 md:px-8 md:pt-6 md:pb-10 bg-[#FAFAFA]">
        <section
          className={`relative w-full bg-[#F7F5F2] overflow-hidden rounded-[2rem] shadow-md animate-pulse aspect-[16/7] md:min-h-[400px] max-h-[78vh]`}
        />
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative z-0 w-full px-4 pt-4 pb-6 md:px-8 md:pt-6 md:pb-10 bg-[#FAFAFA]">
      <section className="relative z-0 w-full aspect-[16/7] md:min-h-[400px] max-h-[78vh] bg-[#F7F5F2] overflow-hidden rounded-[2rem] shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title || "Hero Banner"}
              fill
              unoptimized
              className="object-cover object-center"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {slides.length > 1 && (
          <div
            className={`absolute left-1/2 z-20 flex -translate-x-1/2 gap-2 bottom-6`}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current ? "bg-[#C2185B] w-8" : "bg-white/60 w-3 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
