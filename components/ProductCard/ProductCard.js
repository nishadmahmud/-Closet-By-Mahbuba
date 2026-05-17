"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { ShoppingBag } from "lucide-react";
import { persistListingSnapshotOnNavigate } from "@/lib/productSnapshot";

export default function ProductCard({ product, showMobileArrows = false }) {
  const [currentImg, setCurrentImg] = useState(0);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const brand = product.brand || "CLOSET BY MAHBUBA";
  const colors = product.colors || ["#1A1A1A"];
  const price = typeof product.price === "number" ? product.price : 0;
  const originalPrice = product.originalPrice || null;
  const discount = product.discount || "";
  const productLink = `/product/${product.id || 240158}`;
  const productId = product.id;
  const inWishlist = productId != null && isInWishlist(productId);

  // Build images array — support both single `image` and `images[]`
  const images = (() => {
    if (Array.isArray(product.images) && product.images.length > 0) return product.images;
    if (product.image) return [product.image];
    return ["/placeholder.png"];
  })();

  const hasMultiple = images.length > 1;

  const prevImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (productId == null) return;
    if (inWishlist) {
      removeFromWishlist(productId);
      return;
    }
    const imgs =
      Array.isArray(product.image_paths) && product.image_paths.length > 0
        ? product.image_paths
        : images;
    addToWishlist({
      ...product,
      image_paths: imgs,
      image_path: imgs[0] || product.image_path,
      image: imgs[0] || product.image,
    });
  };

  return (
    <div className="group cursor-pointer w-full transition-all duration-500 hover:-translate-y-1">
      <Link
        href={productLink}
        className="block"
        onClick={() => persistListingSnapshotOnNavigate(product)}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[3/4] bg-[#F7F5F2] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-500">
          <Image
            src={images[currentImg]}
            alt={product.name}
            fill
            unoptimized
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Floating Cart Button (Desktop only, mobile will tap) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // In the future this can directly add to cart or open quick view
            }}
            className="absolute bottom-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-[#1A0A10] opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#C2185B] hover:text-white"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-3 left-3 bg-[#C2185B] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full z-10 shadow-sm">
              {discount}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:scale-110 ${
              inWishlist ? "text-[#C2185B]" : "text-[#8D6E7F] hover:text-[#C2185B]"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={inWishlist}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={inWishlist ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Desktop arrows (hover) + optional mobile arrows for list view */}
          {hasMultiple && (
            <>
              <button
                onClick={prevImg}
                className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm items-center justify-center transition-opacity duration-300 z-10 hover:bg-white shadow-sm ${
                  showMobileArrows
                    ? "flex md:hidden"
                    : "hidden md:flex opacity-0 md:group-hover:opacity-100"
                }`}
                aria-label="Previous image"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C2185B" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={nextImg}
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm items-center justify-center transition-opacity duration-300 z-10 hover:bg-white shadow-sm ${
                  showMobileArrows
                    ? "flex md:hidden"
                    : "hidden md:flex opacity-0 md:group-hover:opacity-100"
                }`}
                aria-label="Next image"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C2185B" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 transition-opacity duration-300 ${
                showMobileArrows
                  ? "opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}>
                {images.slice(0, 5).map((_, idx) => (
                  <span
                    key={idx}
                    className={`block rounded-full transition-all duration-300 ${
                      idx === currentImg ? "w-4 h-1 bg-[#C2185B]" : "w-1 h-1 bg-[#C2185B]/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1.5 px-1">
          <span className="text-[10px] text-[#8D6E7F] tracking-widest uppercase font-bold">
            {brand === "CLOSET BY MAHBUBA" ? "CLOSET BY MAHBUBA" : brand}
          </span>
          <h3 className="text-sm text-[#2D3748] leading-relaxed truncate" style={{fontFamily: 'var(--font-playfair)'}}>
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#C2185B]">
                ৳{price.toLocaleString()}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-xs text-[#8D6E7F] line-through">
                  ৳{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {/* Colors */}
            <div className="flex gap-1.5">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
