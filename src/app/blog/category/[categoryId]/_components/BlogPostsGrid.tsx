import BlogCard from "@/components/blog/BlogCard";
import { BlogPost } from "@/lib/types/blogPost.type";
import { BlogCategory } from "@/lib/types/blogCategory.type";

interface BlogPostsGridProps {
  blogPosts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogPostsGrid({ blogPosts, categories }: BlogPostsGridProps) {
  const getCategoryName = (categoryId: string): string => {
    const foundCategory = categories.find(cat => cat.id === categoryId);
    return foundCategory?.name || "Unknown Category";
  };

  return (
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
  );
}
