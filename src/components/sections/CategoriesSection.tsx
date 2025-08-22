import Link from "next/link";
import { BookOpen } from "lucide-react";
import { categories } from "@/lib/data/mockData";

export default function CategoriesSection() {
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
  );
}
