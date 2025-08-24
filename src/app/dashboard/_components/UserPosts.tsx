"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { Edit, Eye, Trash2, Calendar, Clock, Tag } from "lucide-react";

export default function UserPosts() {
  const { posts, loading } = useSelector((state: RootState) => state.blogPost);
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'drafts'>('all');

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'published') return post.isPublished;
    if (activeTab === 'drafts') return !post.isPublished;
    return true;
  });

  const tabs = [
    { id: 'all', label: 'All Posts', count: posts.length },
    { id: 'published', label: 'Published', count: posts.filter(p => p.isPublished).length },
    { id: 'drafts', label: 'Drafts', count: posts.filter(p => !p.isPublished).length },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
          <Link
            href="/new-post"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Post
          </Link>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab === 'all' ? '' : activeTab} posts yet
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === 'all' 
                ? "Start writing your first blog post!"
                : activeTab === 'published'
                ? "Publish your first post to see it here."
                : "Create a draft to save your work in progress."
              }
            </p>
            <Link
              href="/new-post"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                                     <div className="flex items-center space-x-3 mb-2">
                     <h3 className="font-medium text-gray-900">{post.title}</h3>
                     {!post.isPublished && (
                       <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                         Draft
                       </span>
                     )}
                   </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTimeMin} min read</span>
                    </div>
                    {post.views && (
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} views</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/blog/${post.id}`}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="View post"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/edit-post/${post.id}`}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    title="Edit post"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete post"
                    onClick={() => {
                      // TODO: Implement delete functionality
                      console.log('Delete post:', post.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
