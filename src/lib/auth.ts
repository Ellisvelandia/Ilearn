import { createBrowserClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function auth() {
  const cookieStore = await cookies();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
} 