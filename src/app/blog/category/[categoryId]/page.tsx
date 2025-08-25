"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BlogPost } from "@/lib/types/blogPost.type";
import { BlogCategory } from "@/lib/types/blogCategory.type";
import { blogPostService } from "@/lib/services/blogPostService";
import { categoryService } from "@/lib/services/categoryService";
import BlogCard from "@/components/blog/BlogCard";
import { ArrowLeft, BookOpen, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

export default function CategoryBlogsPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.categoryId as string;
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch category details and blog posts in parallel
        const [categoryResponse, blogPostsResponse, categoriesResponse] = await Promise.all([
          categoryService.getCategories(),
          blogPostService.getBlogPostsByCategoryId(categoryId),
          categoryService.getCategories()
        ]);

        // Find the specific category
        const foundCategory = categoryResponse.find(cat => cat.id === categoryId);
        if (!foundCategory) {
          setError("Category not found");
          return;
        }

        setCategory(foundCategory);
        setBlogPosts(blogPostsResponse.blogPosts);
        setCategories(categoriesResponse);
      } catch (err) {
        console.error("Error fetching category blogs:", err);
        setError("Failed to load category blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  const getCategoryName = (categoryId: string): string => {
    const foundCategory = categories.find(cat => cat.id === categoryId);
    return foundCategory?.name || "Unknown Category";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
            <Link
              href="/blog"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors inline-block"
            >
              View All Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              href="/blog"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to All Blogs
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                {category?.name} Blogs
              </h1>
            </div>
            
            <div className="flex items-center text-gray-600 mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">
                {blogPosts.length} {blogPosts.length === 1 ? 'article' : 'articles'} in this category
              </span>
            </div>
            
            {category?.description && (
              <p className="text-gray-600 text-sm">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                getCategoryName={getCategoryName}
                featured={post.isFeatured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No blogs found in this category
            </h2>
            <p className="text-gray-600 mb-6">
              There are currently no published blogs in the "{category?.name}" category.
            </p>
            <div className="space-x-4">
              <Link
                href="/blog"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                View All Blogs
              </Link>
              <Link
                href="/new-post"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-block"
              >
                Write a Blog
              </Link>
            </div>
          </div>
        )}

        {/* Category Stats */}
        {blogPosts.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Category Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {blogPosts.length}
                </div>
                <div className="text-gray-600">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {blogPosts.filter(post => post.isFeatured).length}
                </div>
                <div className="text-gray-600">Featured Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(blogPosts.reduce((acc, post) => acc + post.readTimeMin, 0) / blogPosts.length)}
                </div>
                <div className="text-gray-600">Avg. Read Time (min)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
