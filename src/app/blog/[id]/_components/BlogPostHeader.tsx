import BackToBlogButton from "./BackToBlogButton";

export default function BlogPostHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <BackToBlogButton variant="simple" />
      </div>
    </div>
  );
}
