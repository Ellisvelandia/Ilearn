"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "An error occurred while sending the reset link");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full bg-white shadow-sm border-0 sm:border sm:border-gray-100">
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 p-4">
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-sm text-red-700">{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-sm text-green-700">
                Check your email for a link to reset your password. If it doesn&apos;t appear within a few minutes, check your spam folder.
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              disabled={isLoading || success}
              className="h-10 bg-white border-gray-200 focus:border-gray-900 focus:ring-0 text-sm"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 p-4 pt-0">
          <Button
            type="submit"
            className="w-full h-10 bg-gray-900 hover:bg-black text-white text-sm font-medium shadow-none"
            disabled={isLoading || success}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Send Reset Link
          </Button>
          <Button
            variant="link"
            type="button"
            className="w-full text-sm text-gray-600 hover:text-gray-900 font-normal p-0"
            disabled={isLoading}
            onClick={() => router.push("/auth/login")}
          >
            Back to Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 