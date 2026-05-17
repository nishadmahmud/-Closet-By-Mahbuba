"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { sortCategoriesForNav } from "@/lib/sortCategoriesForNav";

/**
 * Desktop category row; mega menu only when variant is "header" (not under hero).
 * @param {"header" | "hero-attach"} variant
 */
export default function CategoryNavBar({ categories = [], variant = "header" }) {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const megaEnabled = variant === "header";

  const orderedCategories = useMemo(() => sortCategoriesForNav(categories), [categories]);

  if (!Array.isArray(orderedCategories) || orderedCategories.length === 0) {
    return null;
  }

  const firstCategoryId = orderedCategories[0]?.category_id;
  const shopHref = firstCategoryId ? `/category/${firstCategoryId}` : "/#new-arrivals";

  const isHeroAttach = variant === "hero-attach";

  const outerClass = isHeroAttach
    ? "flex w-full bg-[#FAFAFA] relative z-20 pb-8 justify-center"
    : "hidden md:flex z-30 h-full items-center";

  const innerRowClass = isHeroAttach
    ? "flex items-center gap-1 xl:gap-4 overflow-x-auto hide-scrollbar"
    : "flex items-center gap-1 md:gap-4 h-full justify-center";

  return (
    <div className={outerClass} onMouseLeave={() => megaEnabled && setActiveMegaMenu(null)}>
      {isHeroAttach ? (
        <div className={innerRowClass}>
          {orderedCategories.map((cat, index) => (
            <Link
              key={cat.category_id}
              href={`/category/${cat.category_id}`}
              className="flex-shrink-0 flex items-center justify-center bg-white px-6 py-3 rounded-full text-center text-[11px] font-bold uppercase tracking-[0.15em] text-[#2D3748] shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:bg-[#FDF6F8] hover:text-[#C2185B] border border-transparent hover:border-[#F0D9E5]"
            >
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className={innerRowClass}>
          {orderedCategories.map((cat) => (
            <div
              key={cat.category_id}
              className="h-full flex items-center"
              onMouseEnter={() => megaEnabled && setActiveMegaMenu(cat.category_id)}
            >
              <Link href={`/category/${cat.category_id}`} className="block px-4 py-2 rounded-full hover:bg-[#FDF6F8] transition-colors group">
                <button
                  type="button"
                  className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A0A10] group-hover:text-[#C2185B] transition-colors whitespace-nowrap flex items-center"
                >
                  {cat.name}
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {megaEnabled &&
        activeMegaMenu &&
        orderedCategories.find((c) => c.category_id === activeMegaMenu)?.sub_category?.length > 0 && (
        <div className="fixed top-[100px] left-[50vw] -translate-x-1/2 w-[90vw] max-w-[1200px] bg-white/95 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-[100] border border-white/60 rounded-[2.5rem] pb-6 overflow-hidden">
          <div className="w-full px-8 md:px-12 py-12 flex justify-center gap-16 xl:gap-24">
            {orderedCategories.find((c) => c.category_id === activeMegaMenu).sub_category.map((sub) => (
              <div key={sub.id} className="flex flex-col min-w-[140px]">
                <Link
                  href={`/category/${activeMegaMenu}?subcategory=${sub.id}`}
                  onClick={() => setActiveMegaMenu(null)}
                  className="text-[11px] font-bold tracking-widest uppercase text-[#1A0A10] mb-6 hover:text-[#C2185B] transition-colors"
                >
                  {sub.name}
                </Link>
                {sub.child_categories && sub.child_categories.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {sub.child_categories.map((child) => (
                      <Link
                        key={child.id}
                        href={`/category/${activeMegaMenu}?child=${child.id}`}
                        onClick={() => setActiveMegaMenu(null)}
                        className="text-[11px] text-[#8D6E7F] hover:text-[#C2185B] transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
