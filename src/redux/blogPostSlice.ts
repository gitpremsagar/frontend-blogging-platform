import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BlogPost } from "@/lib/types/blogPost.type";
import { blogPostService } from "@/lib/services/blogPostService";

// Async thunk for fetching blog posts
export const fetchBlogPosts = createAsyncThunk(
  'blogPost/fetchBlogPosts',
  async (params?: { page?: number; limit?: number; category?: string; author?: string; published?: boolean }) => {
    const response = await blogPostService.getBlogPosts(params);
    return response;
  }
);

// Async thunk for fetching a single blog post
export const fetchBlogPost = createAsyncThunk(
  'blogPost/fetchBlogPost',
  async (id: string) => {
    const post = await blogPostService.getBlogPost(id);
    return post;
  }
);

export const blogPostSlice = createSlice({
  name: "blogPost",
  initialState: {
    posts: [] as BlogPost[],
    currentPost: null as BlogPost | null,
    loading: false,
    error: null as string | null,
    total: 0,
    page: 1,
    limit: 10,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch blog posts
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the new API response structure
        const response = action.payload;
        state.posts = response.blogPosts || [];
        state.total = response.total || 0;
        state.page = response.page || 1;
        state.limit = response.limit || 10;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blog posts';
      })
      // Fetch single blog post
      .addCase(fetchBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blog post';
      });
  },
});

export const { setPosts, setCurrentPost, clearCurrentPost, clearError } = blogPostSlice.actions;
export default blogPostSlice.reducer;
