"use client";

import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import { HeartCrack, ShoppingBag } from "lucide-react";
import ContentPage from "@/components/ContentPage/ContentPage";

export default function PublicWishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const formatPrice = (price) => `৳ ${Number(price || 0).toLocaleString()}`;

  return (
    <ContentPage
      title="My Wishlist"
      subtitle={`${wishlist.length} saved item${wishlist.length === 1 ? "" : "s"}`}
      breadcrumb="Wishlist"
      maxWidth="max-w-6xl"
      noCard
    >
      {wishlist.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-[#F0D9E5] bg-white py-24 text-center shadow-sm">
          <HeartCrack className="mx-auto mb-6 h-12 w-12 text-[#F8BBD9]" />
          <p className="mb-4 text-sm text-[#8D6E7F]">Your wishlist is currently empty.</p>
          <Link
            href="/category/16167"
            className="inline-block rounded-full bg-[#C2185B] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#9C0E47]"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-2xl border border-[#F0D9E5] bg-white shadow-sm transition-shadow hover:shadow-[0_8px_24px_-8px_rgba(194,24,91,0.2)]"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromWishlist(product.id);
                }}
                className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#1A0A10] opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-[#FDF6F8] hover:text-[#C2185B]"
                aria-label="Remove from wishlist"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-[3/4] bg-[#FDF6F8]">
                  {product.image_paths?.[0] || product.image_path || product.image ? (
                    <Image
                      src={product.image_paths?.[0] || product.image_path || product.image}
                      alt={product.name || "Product"}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[#8D6E7F]">No Image</div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3
                    className="mb-2 truncate text-xs font-bold uppercase tracking-wide text-[#1A0A10]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-bold text-[#C2185B]">
                      {formatPrice(product.retail_price || product.price)}
                    </span>
                    {(product.old_price || product.mrp_price) && (
                      <span className="text-xs text-[#8D6E7F] line-through">
                        {formatPrice(product.old_price || product.mrp_price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-2 border-t border-[#F0D9E5] bg-[#FDF6F8] text-[10px] font-bold uppercase tracking-widest text-[#1A0A10] transition-colors hover:bg-[#C2185B] hover:text-white"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </ContentPage>
  );
}
