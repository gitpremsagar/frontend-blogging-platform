import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface BlogPostTagsProps {
  tags?: string[];
}

export default function BlogPostTags({ tags }: BlogPostTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <Tag className="w-4 h-4 text-gray-400" />
      {tags.map((tag, index) => (
        <Badge key={index} variant="outline">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
