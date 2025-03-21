'use server'

import { createClient } from '@/lib/supabase/server'

interface Goal {
  id: string
  title: string
  targetHours: number
  currentHours: number
  dueDate: string
}

export async function StudyGoalsProgress({ userId }: { userId: string }) {
  const supabase = await createClient()
  
  // In a real app, fetch actual goals from Supabase
  // For now, using placeholder data
  const goals: Goal[] = [
    {
      id: '1',
      title: 'Complete React Course',
      targetHours: 15,
      currentHours: 9,
      dueDate: 'Apr 15'
    },
    {
      id: '2',
      title: 'Master Algorithms',
      targetHours: 25,
      currentHours: 8,
      dueDate: 'May 20'
    },
    {
      id: '3',
      title: 'Build Portfolio Project',
      targetHours: 40,
      currentHours: 12,
      dueDate: 'Jun 10'
    }
  ]
  
  return (
    <div className="bg-card p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-3">Study Goals</h3>
      
      <div className="space-y-4">
        {goals.map(goal => {
          const progressPercent = Math.round((goal.currentHours / goal.targetHours) * 100)
          
          return (
            <div key={goal.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <p className="font-medium">{goal.title}</p>
                <p className="text-sm text-muted-foreground">Due {goal.dueDate}</p>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              
              <p className="text-sm text-muted-foreground">
                {goal.currentHours} of {goal.targetHours} hours completed
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
} 