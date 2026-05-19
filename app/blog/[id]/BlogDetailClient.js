"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getBlogs } from "@/lib/api";

export default function BlogDetailClient() {
  const params = useParams();
  const blogId = params?.id;

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogs();

        if (response.success && response.data) {
          const foundBlog = response.data.find((b) => String(b.id) === String(blogId));
          if (foundBlog) {
            setBlog(foundBlog);
            const others = response.data
              .filter((b) => String(b.id) !== String(blogId) && b.status === 1)
              .slice(0, 3);
            setRelatedBlogs(others);
          } else {
            setBlog(null);
            setRelatedBlogs([]);
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex min-h-[50vh] items-center justify-center bg-[#FAFAFA]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#F0D9E5] border-t-[#C2185B]" />
        </main>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FAFAFA] px-4">
          <p className="mb-4 text-[#8D6E7F]">Blog post not found.</p>
          <Link href="/blog" className="text-sm font-bold uppercase tracking-widest text-[#C2185B] hover:text-[#9C0E47]">
            ← Back to blog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {blog.image && (
          <div className="relative h-64 w-full md:h-96">
            <Image src={blog.image} alt={blog.title} fill className="object-cover" unoptimized priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A10]/70 to-transparent" />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8D6E7F]">
            <Link href="/" className="transition-colors hover:text-[#C2185B]">
              Home
            </Link>
            <span className="text-[#F0D9E5]">/</span>
            <Link href="/blog" className="transition-colors hover:text-[#C2185B]">
              Blog
            </Link>
            <span className="text-[#F0D9E5]">/</span>
            <span className="max-w-[200px] truncate text-[#1A0A10] md:max-w-none">{blog.title}</span>
          </nav>

          <article className="rounded-[2rem] border border-[#F0D9E5] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-10">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#C2185B]">{formatDate(blog.created_at)}</p>
            <h1
              className="mb-6 text-2xl font-medium leading-tight text-[#1A0A10] md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {blog.title}
            </h1>
            <div
              className="html-content text-[#8D6E7F]"
              dangerouslySetInnerHTML={{ __html: blog.description || "" }}
            />
          </article>

          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C2185B] transition-colors hover:text-[#9C0E47]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>
          </div>

          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h2
                className="mb-6 text-lg font-medium text-[#1A0A10]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                More posts
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.id}`}
                    className="group overflow-hidden rounded-2xl border border-[#F0D9E5] bg-white shadow-sm transition-all hover:border-[#C2185B]/30 hover:shadow-md"
                  >
                    <div className="relative h-32 overflow-hidden bg-[#FDF6F8]">
                      {relatedBlog.image ? (
                        <Image
                          src={relatedBlog.image}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#F8BBD9]">
                          ✿
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3
                        className="line-clamp-2 text-sm font-medium text-[#1A0A10] transition-colors group-hover:text-[#C2185B]"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {relatedBlog.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
