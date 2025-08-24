"use client";

import Link from "next/link";
import { Plus, Edit, Settings, BookOpen, TrendingUp, Users } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Create New Post",
      description: "Start writing a new blog post",
      icon: Plus,
      href: "/new-post",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      title: "Edit Profile",
      description: "Update your profile information",
      icon: Edit,
      href: "/profile",
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
    {
      title: "View Analytics",
      description: "Check your post performance",
      icon: TrendingUp,
      href: "/analytics",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
    {
      title: "Manage Categories",
      description: "Organize your content",
      icon: BookOpen,
      href: "/categories",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
    },
    {
      title: "Account Settings",
      description: "Security and preferences",
      icon: Settings,
      href: "/settings",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
    },
    {
      title: "Community",
      description: "Connect with other writers",
      icon: Users,
      href: "/community",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`flex items-center p-3 rounded-lg transition-colors ${action.bgColor} ${action.hoverColor} border border-transparent hover:border-gray-200`}
          >
            <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center mr-3`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">Need Help?</h3>
        <p className="text-sm text-blue-700 mb-3">
          Check out our writing guides and tips to improve your blog.
        </p>
        <Link
          href="/help"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View Help Center →
        </Link>
      </div>
    </div>
  );
}
