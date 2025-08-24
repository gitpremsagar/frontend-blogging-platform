"use client";
import { useParams } from "next/navigation";
import { useBlogPost } from "@/hooks/useBlogPosts";
import { useCategories } from "@/hooks/useCategories";
import BackToHomeButton from "./_components/BackToHomeButton";
import BackToBlogButton from "./_components/BackToBlogButton";
import BlogPostHeader from "./_components/BlogPostHeader";
import BlogPostImage from "./_components/BlogPostImage";
import BlogPostArticle from "./_components/BlogPostArticle";
import BlogPostContent from "./_components/BlogPostContent";
import LoadingSpinner from "./_components/LoadingSpinner";

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const { post, loading, error } = useBlogPost(postId);
  const { categories } = useCategories();

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || "Uncategorized";
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <BackToHomeButton error={error} />;
  }

  if (!post) {
    return <BackToBlogButton error="Blog post not found" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogPostHeader />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <BlogPostImage 
            imageUrl={post.imageUrl} 
            imageAlt={post.imageAlt} 
          />

          <BlogPostArticle
            categoryName={getCategoryName(post.categoryId)}
            title={post.title}
            excerpt={post.excerpt}
            createdAt={post.createdAt}
            readTimeMin={post.readTimeMin}
            authorName={post.author?.name}
            tags={post.tags}
          />

          <BlogPostContent content={post.content} />
        </article>
      </div>
    </div>
  );
}
