"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";

// Color mapping for categories
const categoryColors = [
  "bg-blue-500",
  "bg-green-500", 
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-teal-500",
  "bg-gray-500"
];

export default function CategoriesSection() {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find content that matches your interests and expertise
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center animate-pulse">
                <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-red-600">Error loading categories: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find content that matches your interests and expertise
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              href={`/categories/${category.slug || category.name.toLowerCase()}`}
              className="group"
            >
              <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors duration-300">
                <div className={`w-12 h-12 ${categoryColors[index % categoryColors.length]} rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
