import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify Email | YouLearn",
  description: "Verify your email address",
};

export default async function VerifyEmailPage() {
  // Check if user is already logged in
  const session = await auth();
  
  // If logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="w-full px-3 sm:px-6 md:px-8 flex flex-col justify-center min-w-[320px] max-w-[440px] mx-auto">
        <Card className="w-[95%] min-w-[300px] mx-auto overflow-hidden bg-[#0F0F0F]/80 border-[#1A1A1A]/20 sm:w-[440px]">
          <CardHeader className="space-y-2.5 pb-3 px-5 sm:px-6 pt-6">
            <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-300 text-center">Check your email</CardTitle>
            <CardDescription className="text-gray-100 text-center text-sm sm:text-base">
              We&apos;ve sent you a verification link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-5 sm:px-6 pb-6">
            <p className="text-sm text-gray-400/80 text-center">
              Please check your email and click the verification link to complete your registration.
              If you don&apos;t see the email, check your spam folder.
            </p>
            <div className="flex flex-col space-y-4 pt-2">
              <Button
                variant="outline"
                className="w-full h-12 bg-[#141414]/50 hover:bg-[#1A1A1A]/50 text-white/80 border-0 text-sm rounded-lg
                  transition-all duration-200"
                asChild
              >
                <Link href="/auth/login">
                  Back to Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 