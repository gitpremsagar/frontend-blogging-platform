import Link from "next/link";
import { BookOpen, Home, Search } from "lucide-react";

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Category Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The category you're looking for doesn't exist or may have been removed. 
          You can browse all our blogs or return to the homepage.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/blog"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Browse All Blogs
          </Link>
          
          <Link
            href="/"
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
          
          <Link
            href="/blog"
            className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
