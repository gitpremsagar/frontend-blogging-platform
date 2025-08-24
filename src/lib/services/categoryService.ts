import { axiosWithCredentials } from "@/lib/custom-axios-request";
import { API_ROUTES } from "@/lib/constants";
import { BlogCategory } from "@/lib/types/blogCategory.type";

export const categoryService = {
  async getCategories(): Promise<BlogCategory[]> {
    try {
      const response = await axiosWithCredentials.get(API_ROUTES.category.getCategories);
      return response.data.foundBlogCategories || response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  async createCategory(categoryData: Omit<BlogCategory, 'id' | 'createdAt'>): Promise<BlogCategory> {
    try {
      const response = await axiosWithCredentials.post(API_ROUTES.category.createCategory, categoryData);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  async updateCategory(id: string, categoryData: Partial<BlogCategory>): Promise<BlogCategory> {
    try {
      const response = await axiosWithCredentials.put(API_ROUTES.category.updateCategory.replace(':id', id), categoryData);
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  async deleteCategory(id: string): Promise<void> {
    try {
      await axiosWithCredentials.delete(API_ROUTES.category.deleteCategory.replace(':id', id));
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
};
