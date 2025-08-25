import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function BlogPostSuccessPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-10 border border-gray-300 shadow-xl rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Blog Post Created Successfully!</h1>
          <p className="text-sm text-gray-500 mb-6">
            Your blog post has been created and is ready to be published.
          </p>
          <div className="space-y-3">
            <Link href="/dashboard" className="block">
              <Button className="w-full">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/new-post" className="block">
              <Button variant="outline" className="w-full">
                Create Another Post
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
