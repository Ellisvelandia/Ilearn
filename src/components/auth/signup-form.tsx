"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

// Form validation schema
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupFormValues) {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      toast.success("Check your email to confirm your account!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/5 dark:to-transparent blur-3xl opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:via-transparent dark:to-primary/5 blur-2xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative space-y-2 sm:space-y-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground dark:bg-gradient-to-br dark:from-foreground dark:to-foreground/80 dark:bg-clip-text dark:text-transparent text-center">
          Create an account
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center max-w-[90%] mx-auto">
          Enter your email below to create your account
        </p>
      </motion.div>

      <Form {...form}>
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={form.handleSubmit(onSubmit)} 
          className="relative space-y-4 sm:space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }: { field: ControllerRenderProps<SignupFormValues, 'email'> }) => (
              <FormItem className="space-y-1 sm:space-y-2">
                <FormLabel className="text-sm sm:text-base text-foreground">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    disabled={isLoading}
                    className="h-10 sm:h-12 text-sm sm:text-base bg-background dark:bg-background/50 backdrop-blur-sm border-input hover:border-primary/50 focus:border-primary dark:border-primary/20 dark:focus:border-primary/40 focus:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }: { field: ControllerRenderProps<SignupFormValues, 'password'> }) => (
              <FormItem className="space-y-1 sm:space-y-2">
                <FormLabel className="text-sm sm:text-base text-foreground">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Create a password"
                    type="password"
                    disabled={isLoading}
                    className="h-10 sm:h-12 text-sm sm:text-base bg-background dark:bg-background/50 backdrop-blur-sm border-input hover:border-primary/50 focus:border-primary dark:border-primary/20 dark:focus:border-primary/40 focus:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }: { field: ControllerRenderProps<SignupFormValues, 'confirmPassword'> }) => (
              <FormItem className="space-y-1 sm:space-y-2">
                <FormLabel className="text-sm sm:text-base text-foreground">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your password"
                    type="password"
                    disabled={isLoading}
                    className="h-10 sm:h-12 text-sm sm:text-base bg-background dark:bg-background/50 backdrop-blur-sm border-input hover:border-primary/50 focus:border-primary dark:border-primary/20 dark:focus:border-primary/40 focus:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <Button 
            className="w-full h-10 sm:h-12 text-sm sm:text-base bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-primary dark:via-primary dark:to-primary-foreground shadow-lg shadow-primary/10 dark:shadow-primary/20 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Creating account...
              </span>
            ) : (
              'Create account'
            )}
          </Button>

          <p className="text-center text-xs sm:text-sm md:text-base text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </motion.form>
      </Form>
    </div>
  );
} 