"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchBlogPosts } from "@/redux/blogPostSlice";
import useRequireAuth from "@/hooks/useRequireAuth";
import DashboardHeader from "./_components/DashboardHeader";
import UserStats from "./_components/UserStats";
import UserPosts from "./_components/UserPosts";
import QuickActions from "./_components/QuickActions";
import RecentActivity from "./_components/RecentActivity";
import DashboardLoading from "./_components/DashboardLoading";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useRequireAuth();
  const { user } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.blogPost);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      // Fetch user's blog posts
      dispatch(fetchBlogPosts({ author: user.id, published: undefined }));
    }
  }, [isAuthenticated, dispatch, user?.id]);

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <UserStats />
            <UserPosts />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
