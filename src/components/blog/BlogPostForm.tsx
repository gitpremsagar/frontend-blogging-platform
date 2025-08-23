"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BlogPostFormSchema } from "@/lib/schemas/blogPostForm.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Loader2, X, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { blogPostService } from "@/lib/services/blogPostService";
import { axiosWithAccessToken } from "@/lib/custom-axios-request";
import { BlogCategory } from "@/lib/types/blogCategory.type";
import { API_ROUTES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function BlogPostForm() {
  const { user } = useSelector((state: RootState) => state.user);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const form = useForm<z.infer<typeof BlogPostFormSchema>>({
    resolver: zodResolver(BlogPostFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      readTimeMin: 0,
      imageUrl: "",
      imageAlt: "",
      tags: [],
      categoryId: "",
      isPublished: false,
      isFeatured: false,
      authorId: "abcdefghijklmnopqrstuvwxyz",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosWithAccessToken.get(
        API_ROUTES.category.getCategories
      );
      console.log(response.data);
      setCategories(response.data.foundBlogCategories);
    };
    fetchCategories();
  }, []);

  const addTag = () => {
    if (
      tagInput.trim() &&
      !tags.includes(tagInput.trim()) &&
      tags.length < 10
    ) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      form.setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Sync tags state with form field value
  useEffect(() => {
    form.setValue("tags", tags);
  }, [tags, form]);

  async function onSubmit(values: z.infer<typeof BlogPostFormSchema>) {
    setIsPosting(true);
    setError(null);
    setSuccess(null);

    console.log("values", values);
    console.log("user", user);

    values.authorId = user?.id || "";
    console.log("values", values);

    try {
      const response = await blogPostService.createBlogPost(values);
      setSuccess("Blog post created successfully");
      console.log(response);
    } catch (error) {
      console.log("error from blog post form onSubmit\n", error);
      setError(
        error instanceof Error ? error.message : "Failed to create blog post"
      );
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>

                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of your blog post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>

                <FormControl>
                  <Input placeholder="Excerpt" {...field} />
                </FormControl>
                <FormDescription>
                  This is the excerpt of your blog post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Content" {...field} />
                </FormControl>
                <FormDescription>
                  This is the content of your blog post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="readTimeMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Read Time (in minutes)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Read Time"
                    type="number"
                    min={1}
                    max={999}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                <FormDescription>
                  This is the estimated read time for your blog post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormDescription>
                  This is the URL of the image for your blog post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageAlt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Alt Text</FormLabel>
                <FormControl>
                  <Input placeholder="Image Alt Text" {...field} />
                </FormControl>
                <FormDescription>
                  This is the alt text for the image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md min-h-[40px]">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-blue-800 hover:text-blue-900 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder={
                        tags.length >= 10
                          ? "Maximum 10 tags reached"
                          : "Add tags (press Enter to add)"
                      }
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagInputKeyPress}
                      disabled={tags.length >= 10}
                      className="flex-grow outline-none bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={!tagInput.trim() || tags.length >= 10}
                      className="ml-2 text-blue-600 hover:text-blue-700 focus:outline-none disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </FormControl>
                <FormDescription>
                  Add tags for your blog post. Press Enter or click the + button
                  to add a tag. Maximum 10 tags allowed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
                <FormDescription>
                  This is the category for your blog post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  This is the category for your blog post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published</FormLabel>
                <FormControl>
                  <Switch
                    id="isPublished"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  This is whether your blog post is published.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured</FormLabel>
                <FormControl>
                  <Switch
                    id="isFeatured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  This is whether your blog post is featured.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPosting} className="w-full">
              {isPosting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Please wait...
                </div>
              ) : (
                "Create Blog Post"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
