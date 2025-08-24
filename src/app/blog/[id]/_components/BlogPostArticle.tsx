import { Badge } from "@/components/ui/badge";
import BlogPostMeta from "./BlogPostMeta";
import BlogPostTags from "./BlogPostTags";

interface BlogPostArticleProps {
  categoryName: string;
  title: string;
  excerpt: string;
  createdAt: string;
  readTimeMin: number;
  authorName?: string;
  tags?: string[];
}

export default function BlogPostArticle({
  categoryName,
  title,
  excerpt,
  createdAt,
  readTimeMin,
  authorName,
  tags
}: BlogPostArticleProps) {
  return (
    <div className="p-6 md:p-8">
      {/* Category */}
      <Badge variant="secondary" className="mb-4">
        {categoryName}
      </Badge>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>

      {/* Excerpt */}
      <p className="text-lg text-gray-600 mb-6">
        {excerpt}
      </p>

      {/* Meta Information */}
      <BlogPostMeta
        createdAt={createdAt}
        readTimeMin={readTimeMin}
        authorName={authorName}
      />

      {/* Tags */}
      <BlogPostTags tags={tags} />
    </div>
  );
}
