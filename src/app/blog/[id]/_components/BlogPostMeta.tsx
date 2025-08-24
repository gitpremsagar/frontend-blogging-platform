import { Calendar, Clock, User } from "lucide-react";

interface BlogPostMetaProps {
  createdAt: string;
  readTimeMin: number;
  authorName?: string;
}

export default function BlogPostMeta({ createdAt, readTimeMin, authorName }: BlogPostMetaProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-1" />
        {formatDate(createdAt)}
      </div>
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-1" />
        {readTimeMin} min read
      </div>
      <div className="flex items-center">
        <User className="w-4 h-4 mr-1" />
        {authorName || 'Anonymous'}
      </div>
    </div>
  );
}
