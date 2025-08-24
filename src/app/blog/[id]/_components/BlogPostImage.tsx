import Image from "next/image";

interface BlogPostImageProps {
  imageUrl?: string;
  imageAlt?: string;
}

export default function BlogPostImage({ imageUrl, imageAlt }: BlogPostImageProps) {
  if (!imageUrl) return null;

  return (
    <div className="relative h-64 md:h-96 w-full">
      <Image
        src={imageUrl}
        alt={imageAlt || "Blog post featured image"}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
