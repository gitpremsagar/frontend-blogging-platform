"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPost } from "@/lib/types/blogPost.type";
import { BlogCategory } from "@/lib/types/blogCategory.type";
import { blogPostService } from "@/lib/services/blogPostService";
import { categoryService } from "@/lib/services/categoryService";
import CategoryHeader from "./_components/CategoryHeader";
import BlogPostsGrid from "./_components/BlogPostsGrid";
import EmptyState from "./_components/EmptyState";
import CategoryStats from "./_components/CategoryStats";
import LoadingState from "./_components/LoadingState";
import ErrorState from "./_components/ErrorState";

export default function CategoryBlogsPage() {
  const params = useParams();
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

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <CategoryHeader category={category} postCount={blogPosts.length} />

        {blogPosts.length > 0 ? (
          <>
            <BlogPostsGrid blogPosts={blogPosts} categories={categories} />
            <CategoryStats blogPosts={blogPosts} />
          </>
        ) : (
          <EmptyState category={category} />
        )}
      </div>
    </div>
  );
}
