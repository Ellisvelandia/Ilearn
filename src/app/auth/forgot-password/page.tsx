import { Metadata } from "next";
import { ForgotPasswordForm } from "../../../components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password if you've forgotten it",
};

export default function ForgotPasswordPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 px-4 sm:w-[350px]">
        <div className="flex flex-col space-y-1 text-center">
          <h1 className="text-xl font-medium tracking-tight text-gray-900">
            Forgot your password?
          </h1>
          <p className="text-sm text-gray-500 px-4">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
} 