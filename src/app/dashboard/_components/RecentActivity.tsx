"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FileText, ThumbsUp, Clock } from "lucide-react";

export default function RecentActivity() {
  const { posts } = useSelector((state: RootState) => state.blogPost);

  // Generate mock recent activity based on user's posts
  const generateRecentActivity = () => {
    const activities = [];
    
    // Add activities based on user's posts
    posts.slice(0, 3).forEach((post, index) => {
      const daysAgo = index + 1;
      
      activities.push({
        id: `post-${post.id}`,
        type: 'post_created',
        title: `Created "${post.title}"`,
        description: 'New blog post published',
        time: `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`,
        icon: FileText,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      });

      if (post.likes && post.likes > 0) {
        activities.push({
          id: `likes-${post.id}`,
          type: 'post_liked',
          title: `${post.likes} likes on "${post.title}"`,
          description: 'Readers are enjoying your content',
          time: `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`,
          icon: ThumbsUp,
          color: 'text-pink-600',
          bgColor: 'bg-pink-50',
        });
      }
    });

    // Add some general activities
    activities.push(
      {
        id: 'welcome',
        type: 'welcome',
        title: 'Welcome to Bloggy!',
        description: 'Your account has been created successfully',
        time: '1 week ago',
        icon: Clock,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
      }
    );

    // Sort by time (most recent first)
    return activities.sort((a, b) => {
      const aDays = parseInt(a.time.split(' ')[0]);
      const bDays = parseInt(b.time.split(' ')[0]);
      return aDays - bDays;
    }).slice(0, 5);
  };

  const recentActivity = generateRecentActivity();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
      
      {recentActivity.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-600">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Activity →
        </button>
      </div>
    </div>
  );
}
