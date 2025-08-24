"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User, Calendar, Mail } from "lucide-react";

export default function DashboardHeader() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-600 mt-1">
              {`Here's what's happening with your blog today.`}
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Member since {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
