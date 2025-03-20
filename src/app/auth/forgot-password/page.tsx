import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="w-full px-3 sm:px-6 md:px-8 flex flex-col justify-center min-w-[320px] max-w-[440px] mx-auto">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
