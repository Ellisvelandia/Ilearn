import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {session.user.email}</h1>
          <p className="text-muted-foreground">
            This is your personal dashboard where you can manage your learning materials.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Add your dashboard cards here */}
          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold">Recent Materials</h2>
            <p className="text-sm text-muted-foreground">
              Your recently added study materials will appear here.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold">Study Progress</h2>
            <p className="text-sm text-muted-foreground">
              Track your learning progress and achievements.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold">AI Insights</h2>
            <p className="text-sm text-muted-foreground">
              Get personalized learning recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 