import { BlogPost } from "@/lib/types/blogPost.type";

interface CategoryStatsProps {
  blogPosts: BlogPost[];
}

export default function CategoryStats({ blogPosts }: CategoryStatsProps) {
  const featuredCount = blogPosts.filter(post => post.isFeatured).length;
  const avgReadTime = blogPosts.length > 0 
    ? Math.round(blogPosts.reduce((acc, post) => acc + post.readTimeMin, 0) / blogPosts.length)
    : 0;

  return (
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
            {featuredCount}
          </div>
          <div className="text-gray-600">Featured Articles</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {avgReadTime}
          </div>
          <div className="text-gray-600">Avg. Read Time (min)</div>
        </div>
      </div>
    </div>
  );
}
