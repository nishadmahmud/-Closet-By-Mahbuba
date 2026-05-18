import { Inter, Playfair_Display, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import AuthDrawer from "@/components/AuthDrawer/AuthDrawer";
import CartSidebar from "@/components/CartSidebar/CartSidebar";
import MobileBottomNav from "@/components/MobileBottomNav/MobileBottomNav";
import WelcomePopup from "@/components/WelcomePopup/WelcomePopup";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import FloatingWhatsApp from "@/components/FloatingWhatsApp/FloatingWhatsApp";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Closet By Mahbuba | Women's Premium Fashion Boutique",
  description:
    "Discover premium women's clothing at Closet By Mahbuba. Shop the finest ethnic wear, western fusion, and exclusive designs curated for the modern woman in Bangladesh.",
  keywords: "women's fashion, boutique, ethnic wear, salwar kameez, saree, lehenga, Closet By Mahbuba, Mahbuba, Bangladesh women's clothing, ladies fashion",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Closet By Mahbuba | Women's Premium Fashion Boutique",
    description: "Discover premium women's clothing at Closet By Mahbuba. Shop the finest ethnic wear, western fusion, and exclusive designs curated for the modern woman in Bangladesh.",
    siteName: "Closet By Mahbuba",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Closet By Mahbuba Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Closet By Mahbuba | Women's Premium Fashion Boutique",
    description: "Discover premium women's clothing at Closet By Mahbuba.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${greatVibes.variable}`}>
      <body className="pb-16 md:pb-0">
        <AuthProvider>
          <WishlistProvider>
            <CategoriesProvider>
              <CartProvider>
                <ScrollToTop />
                {children}
                <AuthDrawer />
                <CartSidebar />
                <MobileBottomNav />
                {/* <FloatingWhatsApp /> */}
                <WelcomePopup />
              </CartProvider>
            </CategoriesProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
