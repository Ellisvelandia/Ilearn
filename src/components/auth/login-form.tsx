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

export function LoginForm() {
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

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Refresh the page to update the session
      router.refresh();
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-white to-gray-50/50 shadow-lg border border-gray-100">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">Welcome back</CardTitle>
        <CardDescription className="text-gray-500">
          Enter your credentials to access your account
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
            Sign In
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full h-11 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            disabled={isLoading}
            onClick={() => router.push("/auth/signup")}
          >
            Create an account
          </Button>
          <Button
            variant="link"
            type="button"
            className="w-full text-sm text-gray-600 hover:text-blue-600 transition-colors"
            disabled={isLoading}
            onClick={() => router.push("/auth/forgot-password")}
          >
            Forgot your password?
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 