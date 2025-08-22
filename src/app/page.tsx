import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, BookOpen, TrendingUp, Star } from "lucide-react";

// Mock data for featured blogs
const featuredBlogs = [
  {
    id: 1,
    title: "The Future of Web Development: What's Next in 2024",
    excerpt: "Explore the latest trends and technologies that are shaping the future of web development, from AI integration to advanced frameworks.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Mastering React Hooks: A Comprehensive Guide",
    excerpt: "Learn how to effectively use React Hooks to build more maintainable and efficient React applications.",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "12 min read",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Design Systems: Building Consistent User Experiences",
    excerpt: "Discover how design systems can help create cohesive and scalable user interfaces across your applications.",
    author: "Emily Davis",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    title: "The Art of Writing Clean Code",
    excerpt: "Best practices and principles for writing maintainable, readable, and efficient code that your team will love.",
    author: "Alex Rodriguez",
    date: "2024-01-08",
    readTime: "15 min read",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop"
  },
  {
    id: 5,
    title: "Getting Started with TypeScript",
    excerpt: "A beginner-friendly guide to TypeScript and how it can improve your JavaScript development experience.",
    author: "Lisa Wang",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    featured: true
  },
  {
    id: 6,
    title: "UX Design Principles for Better User Engagement",
    excerpt: "Learn the fundamental principles of UX design that will help you create more engaging and user-friendly applications.",
    author: "David Kim",
    date: "2024-01-03",
    readTime: "9 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop"
  }
];

const categories = [
  { name: "Technology", count: 24, color: "bg-blue-500" },
  { name: "Programming", count: 18, color: "bg-green-500" },
  { name: "Design", count: 15, color: "bg-purple-500" },
  { name: "Business", count: 12, color: "bg-orange-500" },
  { name: "Lifestyle", count: 8, color: "bg-pink-500" },
  { name: "Science", count: 6, color: "bg-indigo-500" }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block text-yellow-300">Stories & Ideas</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Join thousands of readers exploring the latest insights in technology, 
              programming, design, and more. Start your reading journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/sign-up" 
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center"
              >
                Start Reading
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/popular" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300 flex items-center justify-center"
              >
                Explore Blogs
                <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked articles from our community of writers and developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  {blog.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Featured
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {blog.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {blog.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {blog.readTime}
                    </div>
                    <Link 
                      href={`/blog/${blog.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/blogs" 
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              View All Blogs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find content that matches your interests and expertise
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.name}
                href={`/categories/${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors duration-300">
                  <div className={`w-12 h-12 ${category.color} rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} articles</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Active Readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Published Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Expert Writers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Fresh Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Writing?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Share your knowledge, experiences, and insights with our growing community of readers and developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sign-up" 
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors duration-300"
            >
              Join as Writer
            </Link>
            <Link 
              href="/sign-in" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
