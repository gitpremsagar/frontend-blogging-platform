import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-5">Landing Page</h1>
      <Link href="/sign-up">Sign Up</Link>
      <Link href="/sign-in">Sign In</Link>
    </main>
  );
}
