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
    <Card className="w-[95%] min-w-[300px] mx-auto overflow-hidden bg-[#0F0F0F]/80 border-[#1A1A1A]/20 sm:w-[440px] lg:w-full">
      <CardHeader className="space-y-2.5 pb-3 px-5 sm:px-6 pt-6">
        <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-300 text-center">Create an Account</CardTitle>
        <CardDescription className="text-gray-100 text-center text-sm sm:text-base">
          Enter your details to create your YouLearn account
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-5 px-5 sm:px-6 pt-4">
          {error && (
            <Alert variant="destructive" className="bg-red-950/20 border-red-950/10 rounded-lg">
              <AlertDescription className="text-xs sm:text-sm text-red-400/90">{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs sm:text-sm font-normal text-gray-400/80">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              disabled={isLoading}
              className="h-12 bg-[#141414]/80 border-0 text-gray-200/90 text-sm rounded-lg
                placeholder:text-gray-500
                focus-visible:ring-1 focus-visible:ring-gray-700/30
                transition-all duration-200 w-full px-4"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs sm:text-sm font-normal text-gray-400/80">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoading}
              className="h-12 bg-[#141414]/80 border-0 text-gray-200/90 text-sm rounded-lg
                placeholder:text-gray-500
                focus-visible:ring-1 focus-visible:ring-gray-700/30
                transition-all duration-200 w-full px-4"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-xs sm:text-sm font-normal text-gray-400/80">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              disabled={isLoading}
              className="h-12 bg-[#141414]/80 border-0 text-gray-200/90 text-sm rounded-lg
                placeholder:text-gray-500
                focus-visible:ring-1 focus-visible:ring-gray-700/30
                transition-all duration-200 w-full px-4"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-5 sm:px-6 py-6">
          <Button
            type="submit"
            className="w-full h-12 bg-white/95 hover:bg-white text-black/90 text-sm font-medium rounded-lg
              transition-all duration-200 shadow-sm"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
          
          <div className="relative w-full my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700/30"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#0F0F0F]/80 px-2 text-gray-500">or</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            type="button"
            className="w-full h-12 bg-[#141414]/50 hover:bg-[#1A1A1A]/50 text-white/80 border-0 text-sm rounded-lg
              transition-all duration-200"
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