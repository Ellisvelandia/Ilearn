import { Metadata } from "next";
import { SignUpForm } from "@/components/auth/signup-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
        <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
          <div className="relative z-20 flex items-center text-lg font-medium">
            YouLearn
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Join YouLearn today and unlock a world of personalized learning with AI-powered tools and expert guidance.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="w-full px-3 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-center space-y-4 min-w-[320px] max-w-[95%] sm:max-w-[600px] mx-auto lg:max-w-none">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
} 