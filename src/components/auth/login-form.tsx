"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, ControllerRenderProps } from 'react-hook-form'
import * as z from 'zod'
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

// Form validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 blur-2xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative space-y-2 sm:space-y-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent text-center">
          Welcome back
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 text-center max-w-[90%] mx-auto">
          Enter your credentials to sign in
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
            render={({ field }: { field: ControllerRenderProps<LoginFormValues, 'email'> }) => (
              <FormItem className="space-y-1 sm:space-y-2">
                <FormLabel className="text-sm sm:text-base text-foreground/90">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    disabled={isLoading}
                    className="h-10 sm:h-12 text-sm sm:text-base bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40 focus:ring-primary/20"
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
            render={({ field }: { field: ControllerRenderProps<LoginFormValues, 'password'> }) => (
              <FormItem className="space-y-1 sm:space-y-2">
                <FormLabel className="text-sm sm:text-base text-foreground/90">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    disabled={isLoading}
                    className="h-10 sm:h-12 text-sm sm:text-base bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40 focus:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Link
              href="/auth/forgot-password"
              className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button 
            className="w-full h-10 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-primary via-primary to-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </Button>

          <p className="text-center text-xs sm:text-sm md:text-base text-muted-foreground/80">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>
        </motion.form>
      </Form>
    </div>
  );
}