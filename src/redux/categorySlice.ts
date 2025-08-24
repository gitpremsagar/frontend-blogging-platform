import { createSlice } from "@reduxjs/toolkit";
import { mockCategories } from "@/lib/data/mockCategories";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: mockCategories,
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
  },
});

export const { setCategories, addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;