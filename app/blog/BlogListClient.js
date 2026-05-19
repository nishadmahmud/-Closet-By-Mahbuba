"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ContentPage from "@/components/ContentPage/ContentPage";
import { getBlogs } from "@/lib/api";

export default function BlogListClient() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        if (response.success && response.data) {
          const activeBlogs = response.data.filter((blog) => blog.status === 1);
          setBlogs(activeBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").trim();
  };

  const truncate = (text, maxLength = 120) => {
    if (!text) return "";
    const stripped = stripHtml(text);
    return stripped.length > maxLength ? `${stripped.substring(0, maxLength)}...` : stripped;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <ContentPage title="Our Blog" subtitle="Stories, updates, and style inspiration." breadcrumb="Blog" noCard>
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#F0D9E5] border-t-[#C2185B]" />
        </div>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      title="Our Blog"
      subtitle="Stories, updates, and style inspiration from Closet By Mahbuba."
      breadcrumb="Blog"
      maxWidth="max-w-6xl"
      noCard
    >
      {blogs.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-[#F0D9E5] bg-white py-20 text-center">
          <p className="text-[#8D6E7F]">No blog posts available yet.</p>
          <Link
            href="/"
            className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-[#C2185B] hover:text-[#9C0E47]"
          >
            Continue shopping →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group overflow-hidden rounded-2xl border border-[#F0D9E5] bg-white shadow-sm transition-all hover:border-[#C2185B]/30 hover:shadow-[0_8px_24px_-8px_rgba(194,24,91,0.2)]"
            >
              <div className="relative h-52 overflow-hidden bg-[#FDF6F8]">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FDF6F8] to-[#F0D9E5]">
                    <span className="text-4xl opacity-40" aria-hidden>
                      ✿
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#C2185B]">
                  {formatDate(blog.created_at)}
                </p>
                <h2
                  className="mb-3 line-clamp-2 text-lg font-medium text-[#1A0A10] transition-colors group-hover:text-[#C2185B]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {blog.title}
                </h2>
                <p className="mb-4 line-clamp-3 text-sm text-[#8D6E7F]">{truncate(blog.description, 120)}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#C2185B] transition-transform group-hover:translate-x-1">
                  Read more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </ContentPage>
  );
}
