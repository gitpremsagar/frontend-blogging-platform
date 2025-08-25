import { axiosWithAccessToken, customAxios } from "@/lib/custom-axios-request";
import { API_ROUTES } from "@/lib/constants";
import { BlogPostFormSchema, BlogPostUpdateSchema } from "../schemas/blogPostForm.schema";
import { BlogPost } from "../types/blogPost.type";
import { z } from "zod";

class BlogPostService {
  async createBlogPost(data: z.infer<typeof BlogPostFormSchema>): Promise<z.infer<typeof BlogPostFormSchema>> {
    try {
      const response = await axiosWithAccessToken.post(API_ROUTES.blogPost.createBlogPost, data);
      return response.data;
    } catch (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
  }

  async getBlogPosts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    author?: string;
    published?: boolean;
    featured?: boolean;
  }): Promise<{ blogPosts: BlogPost[]; total: number; page: number; limit: number }> {
    try {
      console.log("log from getBlogPosts service: called", params);
      // Try without authentication first, fallback to authenticated request if needed
      let response;
      try {
        response = await customAxios.get(API_ROUTES.blogPost.getBlogPosts, {
          params,
        });
      } catch (error: any) {
        // If unauthorized, try with authentication
        if (error.response?.status === 401) {
          response = await axiosWithAccessToken.get(API_ROUTES.blogPost.getBlogPosts, {
            params,
          });
        } else {
          throw error;
        }
      }
      // Handle the new API response structure
      return {
        blogPosts: response.data.blogPosts || [],
        total: response.data.total || 0,
        page: response.data.page || 1,
        limit: response.data.limit || 10,
      };
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }
  }

  async getBlogPost(id: string): Promise<BlogPost> {
    try {
      const response = await customAxios.get(
        API_ROUTES.blogPost.getBlogPost.replace(":id", id)
      );
      return response.data.blogPost;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw error;
    }
  }

  async updateBlogPost(id: string, data: z.infer<typeof BlogPostUpdateSchema>): Promise<z.infer<typeof BlogPostFormSchema>> {
    try {
      const response = await axiosWithAccessToken.put(
        API_ROUTES.blogPost.updateBlogPost.replace(":id", id),
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating blog post:", error);
      throw error;
    }
  }

  async deleteBlogPost(id: string): Promise<void> {
    try {
      await axiosWithAccessToken.delete(API_ROUTES.blogPost.deleteBlogPost.replace(":id", id));
    } catch (error) {
      console.error("Error deleting blog post:", error);
      throw error;
    }
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    console.log("log from getFeaturedBlogPosts service: called");
    try {
      const response = await axiosWithAccessToken.get(API_ROUTES.blogPost.getBlogPosts, {
        params: { featured: true, published: true, limit: 6 },
      });
      return response.data.blogPosts || [];
    } catch (error) {
      console.error("Error fetching featured blog posts:", error);
      throw error;
    }
  }

  async getUserBlogPosts(userId: string): Promise<z.infer<typeof BlogPostFormSchema>[]> {
    try {
      const response = await axiosWithAccessToken.get(API_ROUTES.blogPost.getBlogPosts, {
        params: { author: userId },
      });
      return response.data.posts;
    } catch (error) {
      console.error("Error fetching user blog posts:", error);
      throw error;
    }
  }

  async getBlogPostsByCategoryId(categoryId: string): Promise<{ blogPosts: BlogPost[] }> {
    try {
      const response = await customAxios.get(
        API_ROUTES.blogPost.getBlogPostsByCategoryId.replace(":id", categoryId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching blog posts by category:", error);
      throw error;
    }
  }
}

export const blogPostService = new BlogPostService();
