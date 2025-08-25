import { useRouter } from "next/navigation";
import Link from "next/link";

interface ErrorStateProps {
  error: string | null;
}

export default function ErrorState({ error }: ErrorStateProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="space-x-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
          <Link
            href="/blog"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors inline-block"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
