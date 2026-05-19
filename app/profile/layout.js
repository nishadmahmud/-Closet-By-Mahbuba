"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const NAV_LINKS = [
  { label: "Dashboard", href: "/profile" },
  { label: "Order History", href: "/profile/orders" },
  { label: "Track Order", href: "/profile/track-order" },
  { label: "Returns & Refunds", href: "/profile/returns" },
  { label: "Wishlist", href: "/profile/wishlist" },
  { label: "Settings", href: "/profile/settings" },
];

export default function ProfileLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F0D9E5] border-t-[#C2185B] rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-bold tracking-widest uppercase text-[#8D6E7F]">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-12 py-6 md:py-20 flex flex-col md:flex-row gap-6 md:gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="mb-4 md:mb-6">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C2185B] mb-1" style={{ fontFamily: "var(--font-script)" }}>
              Account
            </p>
            <h1 className="text-xl font-medium text-[#1A0A10]" style={{ fontFamily: "var(--font-playfair)" }}>My Account</h1>
            <p className="text-sm text-[#8D6E7F] mt-2">Welcome back, {user.first_name || user.name || "Guest"}</p>
          </div>
          
          <nav className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-1 md:overflow-visible md:pb-0">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap rounded-xl px-4 py-3 text-xs font-bold tracking-widest uppercase transition-colors md:whitespace-normal ${
                    isActive 
                      ? "bg-[#C2185B] text-white shadow-sm" 
                      : "text-[#8D6E7F] hover:bg-white hover:text-[#C2185B] border border-transparent hover:border-[#F0D9E5]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
              <button
                onClick={logout}
                className="whitespace-nowrap rounded-xl px-4 py-3 text-xs font-bold tracking-widest uppercase text-left transition-colors text-[#8D6E7F] hover:bg-red-50 hover:text-red-600 md:mt-2"
              >
                Sign Out
              </button>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 rounded-[2rem] border border-[#F0D9E5] bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-10">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
