"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpFormSchema } from "@/lib/schemas/signUpForm.schema";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { API_ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function SignUpForm() {
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      type: "USER",
      name: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    setIsPosting(true);
    setError(null);
    setSuccess(null);
  
    try {
      await axios.post(API_ROUTES.auth.signUp, values);
  
      setSuccess("Signup successful!");
      router.push("/sign-up/success");
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.response?.status === 409) {
          
          form.setError("email", {
            type: "manual",
            message: "Email already exists! Please use a different email."
          });
          return; 
        }
      }
      setError(error instanceof Error ? error.message : "Signup failed");
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="container mx-auto">
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-10 border border-gray-300 shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold">Sign-Up</h1>
        <p className="text-sm text-gray-500 mb-4">
          Create an account to get started
        </p>
        
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10" // Add padding for the icon
                        autoComplete="off"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    <span className="text-red-500"> * </span>Password must be at least 6 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="pr-10"
                        autoComplete="off"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPosting}>
              {isPosting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Please wait...
                </div>
              ) : (
                "Sign-up"
              )}
            </Button>
            <div className="flex justify-start items-center gap-2">
              <span className="text-sm text-gray-500">
                Already have an account?
              </span>
              <Link href="/sign-in" className="text-blue-500 hover:text-blue-700">
                Login
              </Link>
            </div>
          </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
