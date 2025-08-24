"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, Plus, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function HeroSection() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
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
            {isAuthenticated ? (
              <>
                <Link 
                  href="/new-post" 
                  className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center"
                >
                  Create New Post
                  <Plus className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/blog" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300 flex items-center justify-center"
                >
                  My Dashboard
                  <User className="ml-2 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/sign-up" 
                  className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center"
                >
                  Join as Writer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/blog" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300 flex items-center justify-center"
                >
                  Explore Blogs
                  <BookOpen className="ml-2 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
