import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

export const brandLinkClass =
  "text-[#C2185B] hover:text-[#9C0E47] underline underline-offset-4 transition-colors font-medium";

export function ContentSection({ title, children, className = "" }) {
  return (
    <section className={`space-y-3 ${className}`}>
      <h2
        className="text-sm font-semibold text-[#1A0A10] tracking-wide"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h2>
      <div className="text-sm text-[#8D6E7F] leading-relaxed space-y-3 [&_strong]:text-[#1A0A10] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function ContentPage({
  title,
  subtitle,
  kicker = "Closet By Mahbuba",
  children,
  maxWidth = "max-w-3xl",
  noCard = false,
  breadcrumb,
}) {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-[#FAFAFA] py-10 md:py-16">
        <div className={`${maxWidth} mx-auto px-4 md:px-8`}>
          {breadcrumb && (
            <nav className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8D6E7F]">
              <Link href="/" className="hover:text-[#C2185B] transition-colors">
                Home
              </Link>
              <span className="text-[#F0D9E5]">/</span>
              <span className="text-[#1A0A10]">{breadcrumb}</span>
            </nav>
          )}

          <div className="text-center mb-8 md:mb-10">
            <p
              className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C2185B] mb-2"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {kicker}
            </p>
            <h1
              className="text-2xl md:text-3xl font-medium text-[#1A0A10] mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-[#8D6E7F] max-w-lg mx-auto">{subtitle}</p>
            )}
          </div>

          {noCard ? (
            children
          ) : (
            <div className="bg-white rounded-[2rem] border border-[#F0D9E5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 space-y-10">
              {children}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
