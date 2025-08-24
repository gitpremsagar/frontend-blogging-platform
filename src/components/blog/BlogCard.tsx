import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Star } from "lucide-react";
import { BlogPost } from "@/lib/types/blogPost.type";

interface BlogCardProps {
  post: BlogPost;
  getCategoryName: (categoryId: string) => string;
  featured?: boolean;
}

export default function BlogCard({ post, getCategoryName, featured = false }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={post.imageUrl} 
          alt={post.imageAlt || post.title}
          className="w-full h-48 object-cover"
        />
        {featured && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {post.category?.name || getCategoryName(post.categoryId)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {post.author?.name || 'Anonymous'}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTimeMin} min read
          </div>
          <Link 
            href={`/blog/${post.id}`}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
          >
            Read More
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
