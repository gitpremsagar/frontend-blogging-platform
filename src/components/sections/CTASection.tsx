import Link from "next/link";

export default function CTASection() {
  return (
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
  );
}
