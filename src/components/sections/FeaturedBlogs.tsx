"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useFeaturedBlogPosts } from "@/hooks/useBlogPosts";
import BlogCard from "@/components/blog/BlogCard";

export default function FeaturedBlogs() {
  const { featuredPosts, loading, error } = useFeaturedBlogPosts();

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked articles from our community of writers and developers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
            <p className="text-red-600">Error loading featured posts: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked articles from our community of writers and developers
          </p>
        </div>

        {featuredPosts.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">No featured posts available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((blog) => (
              <BlogCard 
                key={blog.id} 
                post={blog} 
                getCategoryName={(categoryId) => blog.category?.name || 'Uncategorized'}
                featured={blog.isFeatured}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            View All Blogs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
