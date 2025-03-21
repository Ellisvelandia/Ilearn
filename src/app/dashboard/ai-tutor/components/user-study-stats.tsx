'use server'

import { createClient } from '@/lib/supabase/server'

interface UserStudyStatsProps {
  userId: string
}

/**
 * User Study Statistics Component
 * - React Server Component for data fetching and rendering
 * - No client-side JavaScript
 * - Data fetched and rendered on the server
 */
export async function UserStudyStats({ userId }: UserStudyStatsProps) {
  // Server-side data fetching
  const supabase = await createClient()
  
  // Simulate fetching user statistics
  // In a real application, this would fetch from the database
  
  // Sample stats data - in production this would come from Supabase
  const stats = {
    totalStudyTime: 37.5, // hours
    materialsStudied: 12,
    questionsAnswered: 42,
    lastActive: new Date().toLocaleDateString(),
    streak: 5, // days
  }
  
  return (
    <div className="rounded-lg border p-4 bg-card text-card-foreground">
      <h2 className="text-lg font-semibold mb-3">Your Study Statistics</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total study time</span>
          <span className="font-medium">{stats.totalStudyTime} hours</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Materials studied</span>
          <span className="font-medium">{stats.materialsStudied}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Questions answered</span>
          <span className="font-medium">{stats.questionsAnswered}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Study streak</span>
          <span className="font-medium">{stats.streak} days</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last active</span>
          <span className="font-medium">{stats.lastActive}</span>
        </div>
      </div>
    </div>
  )
} 