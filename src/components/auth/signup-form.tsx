"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      // Show success message and redirect
      router.push("/auth/verify-email");
    } catch (err: any) {
      setError(err?.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-white to-gray-50/50 shadow-lg border border-gray-100">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">Create an Account</CardTitle>
        <CardDescription className="text-gray-500">
          Enter your details to create your YouLearn account
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              disabled={isLoading}
              className="h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoading}
              className="h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              disabled={isLoading}
              className="h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-6">
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white shadow-sm transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full h-11 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            disabled={isLoading}
            onClick={() => router.push("/auth/login")}
          >
            Already have an account? Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 