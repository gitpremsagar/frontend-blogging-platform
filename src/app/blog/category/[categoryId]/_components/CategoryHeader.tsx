import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import { BlogCategory } from "@/lib/types/blogCategory.type";

interface CategoryHeaderProps {
  category: BlogCategory | null;
  postCount: number;
}

export default function CategoryHeader({ category, postCount }: CategoryHeaderProps) {
  return (
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
            {postCount} {postCount === 1 ? 'article' : 'articles'} in this category
          </span>
        </div>
        
        {category?.description && (
          <p className="text-gray-600 text-sm">
            {category.description}
          </p>
        )}
      </div>
    </div>
  );
}
