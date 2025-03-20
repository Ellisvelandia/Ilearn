import { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up | YouLearn",
  description: "Create your YouLearn account",
};

export default async function SignUpPage() {
  // Check if user is already logged in
  const session = await auth();
  
  // If logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left side - Hidden on mobile/tablet, visible on desktop */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-primary via-primary to-primary-foreground bg-clip-text text-transparent text-xl font-bold">
                YouLearn
              </span>
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Join YouLearn today and unlock a world of personalized learning with AI-powered tools and expert guidance.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        {/* Right side - Form container */}
        <div className="p-4 sm:p-8 md:p-12 lg:p-16 flex items-center justify-center">
          {/* Mobile/Tablet Logo - Hidden on desktop */}
          <div className="absolute top-8 inset-x-0 flex justify-center lg:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-primary via-primary to-primary-foreground bg-clip-text text-transparent text-xl font-bold">
                YouLearn
              </span>
            </Link>
          </div>

          {/* Form wrapper */}
          <div className="w-full mt-16 sm:mt-20 lg:mt-0 min-w-[300px] sm:min-w-[400px] max-w-[95%] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px] mx-auto">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
} 