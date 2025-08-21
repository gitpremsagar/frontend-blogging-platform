import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-10 border border-gray-300 shadow-xl rounded-lg">
          <h1 className="text-2xl font-bold">Sign-up Successful!</h1>
          <p className="text-sm text-gray-500 mb-4">
            Now you can sign in to your account.
          </p>
          <Link href="/sign-in" className="text-blue-500">
            <Button variant="outline">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}