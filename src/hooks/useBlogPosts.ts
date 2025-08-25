"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchBlogPosts, fetchBlogPost } from "@/redux/blogPostSlice";
import { blogPostService } from '@/lib/services/blogPostService';
import { BlogPost } from '@/lib/types/blogPost.type';

export const useBlogPosts = (params?: { page?: number; limit?: number; category?: string; author?: string; published?: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, total, page, limit } = useSelector((state: RootState) => state.blogPost);

  // Memoize the params to prevent unnecessary re-renders
  const memoizedParams = useMemo(() => params, [
    params?.page,
    params?.limit,
    params?.category,
    params?.author,
    params?.published
  ]);

  useEffect(() => {
    dispatch(fetchBlogPosts(memoizedParams));
  }, [dispatch, memoizedParams]);

  return { posts, loading, error, total, page, limit };
};

export const useFeaturedBlogPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const posts = await blogPostService.getFeaturedBlogPosts();
        setFeaturedPosts(posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured posts');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return { featuredPosts, loading, error };
};

export const useBlogPost = (id?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, loading, error } = useSelector(
    (state: RootState) => state.blogPost
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogPost(id));
    }
  }, [id, dispatch]);

  return {
    post: currentPost,
    loading,
    error,
  };
};
