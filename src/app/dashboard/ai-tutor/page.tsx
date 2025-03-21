import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { 
  UserStudyStats, 
  AITutorClientChat, 
  RecentMaterialsList, 
  StudyGoalsProgress 
} from './components'

/**
 * AI Tutor page that demonstrates Partial Pre-Rendering
 * - Static parts (header, layout) are rendered as Server Components
 * - Dynamic interactive parts use Client Components
 * - Suspense boundaries separate loading states
 */
export default async function AITutorPage() {
  // This is a Server Component - data fetching happens on the server
  const supabase = await createClient()
  
  // Get user session
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    // If no session, this would normally redirect
    // For this example, we just show placeholder content
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">AI Tutor</h1>
        <p>Please log in to access the AI Tutor</p>
      </div>
    )
  }
  
  // These data fetches happen on the server, not client side
  const userId = session.user.id
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">AI Learning Assistant</h1>
      <p className="text-muted-foreground mb-8">
        Ask questions, get explanations, and study with your AI tutor
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar with static/server rendered content */}
        <div className="lg:col-span-1 space-y-6">
          {/* Study stats component - Server Component */}
          <Suspense fallback={<div className="h-32 bg-muted animate-pulse rounded-lg"></div>}>
            <UserStudyStats userId={userId} />
          </Suspense>
          
          {/* Recent materials - Server Component with streaming */}
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg"></div>}>
            <RecentMaterialsList userId={userId} />
          </Suspense>
          
          {/* Study goals - Server Component with streaming */}
          <Suspense fallback={<div className="h-48 bg-muted animate-pulse rounded-lg"></div>}>
            <StudyGoalsProgress userId={userId} />
          </Suspense>
        </div>
        
        {/* Main content area - Client Component for interactivity */}
        <div className="lg:col-span-2">
          {/* AI Tutor chat interface - Client Component */}
          <AITutorClientChat userId={userId} />
        </div>
      </div>
    </div>
  )
} 