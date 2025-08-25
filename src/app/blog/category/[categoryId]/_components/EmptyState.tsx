import Link from "next/link";
import { BlogCategory } from "@/lib/types/blogCategory.type";

interface EmptyStateProps {
  category: BlogCategory | null;
}

export default function EmptyState({ category }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📝</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        No blogs found in this category
      </h2>
      <p className="text-gray-600 mb-6">
        {`There are currently no published blogs in the "${category?.name}" category.`}
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
  );
}
