"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FileText, Eye, ThumbsUp, Clock } from "lucide-react";

export default function UserStats() {
  const { posts } = useSelector((state: RootState) => state.blogPost);
  const { total } = useSelector((state: RootState) => state.blogPost);

  // Calculate stats
  const publishedPosts = posts.filter(post => post.isPublished);
  const draftPosts = posts.filter(post => !post.isPublished);
  const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);

  const stats = [
    {
      title: "Total Posts",
      value: total || posts.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Published",
      value: publishedPosts.length,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Drafts",
      value: draftPosts.length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    //  {
    //   title: "Total Views",
    //   value: totalViews.toLocaleString(),
    //   icon: Eye,
    //   color: "text-purple-600",
    //   bgColor: "bg-purple-100",
    // },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Blog Stats</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>
      
      {totalLikes > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
          <div className="flex items-center justify-center space-x-2">
            <ThumbsUp className="w-5 h-5 text-pink-600" />
            <span className="text-pink-800 font-medium">
              Your posts have received {totalLikes.toLocaleString()} likes!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
