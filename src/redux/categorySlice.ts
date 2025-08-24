import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BlogCategory } from "@/lib/types/blogCategory.type";
import { categoryService } from "@/lib/services/categoryService";

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const categories = await categoryService.getCategories();
    return categories;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [] as BlogCategory[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      state.categories = state.categories.map(category => category.id === action.payload.id ? action.payload : category);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { setCategories, addCategory, updateCategory, deleteCategory, clearError } = categorySlice.actions;
export default categorySlice.reducer;