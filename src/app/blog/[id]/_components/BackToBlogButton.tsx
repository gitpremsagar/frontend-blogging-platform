import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackToBlogButtonProps {
  error?: string;
  variant?: "full" | "simple";
  className?: string;
}

export default function BackToBlogButton({ 
  error, 
  variant = "full", 
  className = "" 
}: BackToBlogButtonProps) {
  // Simple button variant
  if (variant === "simple") {
    return (
      <Link href="/blog">
        <Button variant="ghost" className={className}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </Link>
    );
  }

  // Full error page variant
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
  );
}
