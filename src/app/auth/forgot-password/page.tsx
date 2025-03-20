import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Forgot Password | YouLearn",
  description: "Reset your YouLearn account password",
};

export default async function ForgotPasswordPage() {
  // Check if user is already logged in
  const session = await auth();

  // If logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back to Home Link - Visible on all screen sizes */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50">
        <Link 
          href="/" 
          className="group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            bg-background/50 dark:bg-muted/30 backdrop-blur-sm
            border border-border hover:border-primary/50
            text-muted-foreground hover:text-primary
            shadow-sm hover:shadow-md hover:shadow-primary/5
            transition-all duration-300 ease-in-out
            hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>

      <div className="relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left side - Hidden on mobile/tablet, visible on desktop */}
        <div className="relative hidden h-full flex-col bg-muted/40 dark:bg-muted p-10 text-foreground dark:text-white lg:flex">
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
                &ldquo;No worries! We'll help you get back into your account quickly and securely.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        {/* Right side - Form container */}
        <div className="p-4 sm:p-8 md:p-12 lg:p-16 flex items-center justify-center bg-background dark:bg-transparent">
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
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
