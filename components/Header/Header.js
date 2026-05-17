"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useCategories } from "@/context/CategoriesContext";
import CategoryNavBar from "@/components/CategoryNavBar/CategoryNavBar";
import { sortCategoriesForNav } from "@/lib/sortCategoriesForNav";

export default function Header({ initialCategories = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const { user, openAuthDrawer, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { getCartCount, toggleCart } = useCart();
  const { categories, seedCategories } = useCategories();
  const navCategoriesOrdered = useMemo(() => sortCategoriesForNav(categories), [categories]);

  // Fetch categories for navigation
  useEffect(() => {
    seedCategories(initialCategories);
  }, [initialCategories, seedCategories]);
  // Search handler with debounce (state updates deferred so effect body is sync-setState-free for lint)
  useEffect(() => {
    let ignore = false;

    if (!searchQuery || searchQuery.length < 2) {
      const clearId = setTimeout(() => {
        if (ignore) return;
        setSearchResults([]);
        setIsSearching(false);
      }, 0);
      return () => {
        ignore = true;
        clearTimeout(clearId);
      };
    }

    const startId = setTimeout(() => {
      if (!ignore) setIsSearching(true);
    }, 0);

    const timer = setTimeout(async () => {
      try {
        const response = await searchProducts(searchQuery);
        if (ignore) return;

        if (response.success) {
          const resultsArray = response.data?.data || response.data || [];
          if (Array.isArray(resultsArray)) {
            setSearchResults(resultsArray.slice(0, 6));
          } else {
            setSearchResults([]);
          }
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        if (!ignore) console.error("Search error:", error);
      } finally {
        if (!ignore) setIsSearching(false);
      }
    }, 400);

    return () => {
      ignore = true;
      clearTimeout(startId);
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <header className="sticky top-4 z-50 transition-all px-4 md:px-8">
      {/* Main Floating Bar */}
      <div className="w-full max-w-[1600px] mx-auto bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] px-4 md:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-[84px] relative">
          
          {/* Mobile Hamburger & Logo */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 hover:bg-[#FDF6F8] rounded-full transition-colors md:hidden text-[#1A0A10]"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>

            <Link href="/" className="flex items-center z-10" aria-label="Closet By Mahbuba home">
              <Image
                src="/logo.png"
                alt="Closet By Mahbuba"
                width={220}
                height={56}
                className="h-7 md:h-9 w-auto object-contain transition-transform hover:scale-105 duration-500"
                priority
              />
            </Link>
          </div>

          {/* Center Category Nav (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <CategoryNavBar categories={navCategoriesOrdered} variant="header" />
          </div>

          {/* Right Nav */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            {/* Search Icon (Visible on mobile and desktop) */}
            <button
              onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(""); setSearchResults([]); }}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#FDF6F8] hover:text-[#C2185B] transition-all text-[#1A0A10]"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

              {/* Wishlist Icon */}
              <Link href="/wishlist" className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-[#FDF6F8] text-[#1A0A10] hover:text-[#C2185B] transition-all relative" aria-label="Wishlist">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="absolute 0 top-1.5 right-1.5 w-3.5 h-3.5 bg-[#C2185B] text-white text-[8px] rounded-full flex items-center justify-center font-bold ring-2 ring-white">
                  {wishlist.length}
                </span>
              </Link>

              {/* Cart Icon */}
              <button onClick={toggleCart} className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-[#FDF6F8] text-[#1A0A10] hover:text-[#C2185B] transition-all relative" aria-label="Cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#C2185B] text-white text-[8px] rounded-full flex items-center justify-center font-bold ring-2 ring-white">
                  {getCartCount()}
                </span>
              </button>

              {/* User Icon */}
              <button 
                onClick={() => user ? router.push('/profile') : openAuthDrawer('login')}
                className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-[#FDF6F8] text-[#1A0A10] hover:text-[#C2185B] transition-all" 
                aria-label="User Account"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      {/* Search Bar Dropdown */}
      {searchOpen && (
        <div className="fixed top-[100px] mt-4 left-[50vw] -translate-x-1/2 w-[95%] max-w-[800px] bg-white/95 backdrop-blur-2xl border border-white/60 py-6 px-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-[100] rounded-[2rem]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search everything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 bg-[#F7F5F2] rounded-full px-8 text-sm font-medium tracking-wide text-[#1A0A10] placeholder-[#8D6E7F] focus:outline-none focus:ring-2 focus:ring-[#C2185B]/20 transition-all shadow-inner"
              autoFocus
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1A0A10] hover:text-[#C2185B] hover:shadow-sm transition-all" onClick={() => setSearchOpen(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          {/* Search Loading State */}
          {isSearching && (
            <div className="max-w-[1600px] mx-auto px-4 md:px-12 mt-6 flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5 text-[#C2185B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          {/* Search Empty State */}
          {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
            <div className="max-w-[1600px] mx-auto px-4 md:px-12 mt-6 flex justify-center">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8D6E7F]">No products found</p>
            </div>
          )}

          {/* Search Results */}
          {!isSearching && searchResults.length > 0 && (
            <div className="max-w-[1600px] mx-auto px-4 md:px-12 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto hide-scrollbar">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="flex items-center gap-4 p-3 bg-white rounded-2xl hover:shadow-md transition-all border border-transparent hover:border-[#F0D9E5] hover:-translate-y-0.5"
                >
                  <div className="w-16 h-16 bg-[#F7F5F2] rounded-xl relative shrink-0 overflow-hidden">
                    <Image
                      src={product.image_paths?.[0] || product.image_path || ""}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold tracking-wide text-[#1A0A10] truncate mb-1">{product.name}</p>
                    <p className="text-[11px] font-bold text-[#C2185B]">৳{Number(product.retails_price || 0).toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className="relative w-[85%] max-w-[340px] h-full bg-[#FAFAFA] shadow-2xl flex flex-col transform transition-transform duration-300 rounded-r-[2rem] overflow-hidden">
            {/* Drawer Header */}
            <div className="p-5 flex items-center justify-between bg-white sticky top-0 z-10 shadow-sm">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="relative flex items-center" aria-label="Closet By Mahbuba home">
                <Image
                  src="/logo.png"
                  alt="Closet By Mahbuba"
                  width={200}
                  height={52}
                  className="h-7 w-auto object-contain object-left"
                />
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F8F8F6] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#FAFAFA] pb-8 hide-scrollbar">
              {/* Auth Section */}
              <div className="p-6 bg-white m-4 rounded-[2rem] shadow-sm border border-[#F7F5F2]">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#C2185B] text-white flex items-center justify-center text-lg font-bold">
                        {user.name?.[0] || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1A1A1A] truncate">{user.name}</p>
                        <p className="text-[10px] text-[#999999] truncate uppercase tracking-widest">{user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link 
                        href="/profile" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center h-10 bg-[#FAFAFA] rounded-full text-[10px] font-bold tracking-widest uppercase text-[#1A0A10] hover:bg-[#1A0A10] hover:text-white transition-all shadow-sm"
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-center h-10 bg-white border border-red-100 rounded-full text-[10px] font-bold tracking-widest uppercase text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#8D6E7F] mb-1">Account</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { openAuthDrawer('login'); setMobileMenuOpen(false); }}
                        className="flex-1 h-12 rounded-full bg-[#1A0A10] text-white text-[10px] font-bold tracking-widest uppercase transition-all hover:bg-[#C2185B] shadow-sm"
                      >
                        Log In
                      </button>
                      <button 
                        onClick={() => { openAuthDrawer('register'); setMobileMenuOpen(false); }}
                        className="flex-1 h-12 rounded-full border border-[#F0D9E5] bg-white text-[#1A0A10] text-[10px] font-bold tracking-widest uppercase hover:border-[#C2185B] hover:text-[#C2185B] transition-all shadow-sm"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Categories */}
              <div className="p-6 bg-white mx-4 rounded-[2rem] shadow-sm border border-[#F7F5F2]">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#8D6E7F] mb-4">Categories</p>
                <div className="grid grid-cols-1 gap-2">
                  {navCategoriesOrdered.map((cat) => {
                    const subcategories = Array.isArray(cat.sub_category) ? cat.sub_category : [];
                    const hasSubcategories = subcategories.length > 0;
                    const isCategoryExpanded = String(expandedCategory) === String(cat.category_id);

                    return (
                      <div key={cat.category_id} className="rounded-2xl bg-[#FAFAFA] hover:bg-[#FDF6F8] transition-colors">
                        <div className="flex items-center justify-between px-4 py-3">
                          <Link
                            href={`/category/${cat.category_id}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="min-w-0 flex-1"
                          >
                            <span className="block truncate text-[11px] font-bold tracking-widest uppercase text-[#1A1A1A]">
                              {cat.name}
                            </span>
                          </Link>

                          {hasSubcategories && (
                            <button
                              type="button"
                              onClick={() => {
                                setExpandedCategory((prev) =>
                                  String(prev) === String(cat.category_id) ? null : cat.category_id
                                );
                                setExpandedSubcategory(null);
                              }}
                              className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center text-[#1A1A1A]"
                              aria-label={`Toggle ${cat.name} subcategories`}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className={`transition-transform ${isCategoryExpanded ? "rotate-90" : ""}`}
                              >
                                <path d="m9 18 6-6-6-6" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {hasSubcategories && isCategoryExpanded && (
                          <div className="px-4 pb-3 space-y-1">
                            {subcategories.map((sub) => {
                              const children = Array.isArray(sub.child_categories) ? sub.child_categories : [];
                              const hasChildren = children.length > 0;
                              const subKey = `${cat.category_id}-${sub.id}`;
                              const isSubExpanded = expandedSubcategory === subKey;

                              return (
                                <div key={sub.id}>
                                  <div className="flex items-center justify-between py-1.5">
                                    <Link
                                      href={`/category/${cat.category_id}?subcategory=${sub.id}`}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="min-w-0 flex-1"
                                    >
                                      <span className="block truncate text-[10px] font-bold tracking-wide uppercase text-[#1A1A1A]">
                                        {sub.name}
                                      </span>
                                    </Link>

                                    {hasChildren && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setExpandedSubcategory((prev) => (prev === subKey ? null : subKey))
                                        }
                                        className="ml-3 flex h-5 w-5 shrink-0 items-center justify-center text-[#6B6B6B]"
                                        aria-label={`Toggle ${sub.name} child categories`}
                                      >
                                        <svg
                                          width="10"
                                          height="10"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          className={`transition-transform ${isSubExpanded ? "rotate-90" : ""} text-[#8D6E7F]`}
                                        >
                                          <path d="m9 18 6-6-6-6" />
                                        </svg>
                                      </button>
                                    )}
                                  </div>

                                  {hasChildren && isSubExpanded && (
                                    <div className="pl-3 pb-1 space-y-1">
                                      {children.map((child) => (
                                        <Link
                                          key={child.id}
                                          href={`/category/${cat.category_id}?subcategory=${sub.id}&child=${child.id}`}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="block py-1"
                                        >
                                          <span className="text-[10px] uppercase tracking-wide text-[#6B6B6B]">
                                            {child.name}
                                          </span>
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Main Navigation */}
              <div className="px-6 py-4 border-t border-[#F0F0F0] space-y-1">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#999999] mb-4">Shop & Explore</p>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 group"
                >
                  <span className="text-xs font-bold tracking-widest uppercase text-[#1A1A1A] group-hover:translate-x-1 transition-transform">Home</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
                <Link
                  href="/offers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-md border border-[#F8BBD9] bg-[#FDF6F8] py-3 pl-3 pr-2 group"
                >
                  <span className="text-xs font-bold tracking-widest uppercase text-[#C2185B] transition-all group-hover:translate-x-1 group-hover:text-[#9C0E47]">
                    Offers
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C2185B" strokeWidth="2" className="group-hover:stroke-[#9C0E47] transition-colors">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 group"
                >
                  <span className="text-xs font-bold tracking-widest uppercase text-[#1A1A1A] group-hover:translate-x-1 transition-transform">Track Order</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
                <Link
                  href="/#new-arrivals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 group"
                >
                  <span className="text-xs font-bold tracking-widest uppercase text-[#1A1A1A] group-hover:translate-x-1 transition-transform">New Arrivals</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
              </div>

              {/* Company Info */}
              <div className="px-6 py-6 bg-[#F8F8F6]/50 border-t border-[#F0F0F0]">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#999999] mb-4">Company</p>
                <div className="flex flex-col gap-4">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-[11px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Contact Us</Link>
                  <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-[11px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">FAQs</Link>
                  <Link href="/shipping" onClick={() => setMobileMenuOpen(false)} className="text-[11px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Shipping & Delivery</Link>
                  <Link href="/returns" onClick={() => setMobileMenuOpen(false)} className="text-[11px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Returns & Exchanges</Link>
                  <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="text-[11px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Privacy Policy</Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-[#F0D9E5] bg-[#FDF6F8]">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#8D6E7F]">© 2025 CLOSET BY MAHBUBA</p>
                <div className="flex gap-4">
                  <a href="#" className="text-[#C2185B] hover:opacity-60 transition-opacity"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                  <a href="#" className="text-[#C2185B] hover:opacity-60 transition-opacity"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
