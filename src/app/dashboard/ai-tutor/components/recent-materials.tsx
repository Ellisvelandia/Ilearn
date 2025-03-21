'use server'

import { createClient } from '@/lib/supabase/server'

interface RecentMaterial {
  id: string
  title: string
  type: string
  last_accessed: string
  progress: number
}

export async function RecentMaterialsList({ userId }: { userId: string }) {
  const supabase = await createClient()
  
  // In a real app, fetch actual data from Supabase
  // For now, using placeholder data
  const materials: RecentMaterial[] = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      type: 'lesson',
      last_accessed: '2 hours ago',
      progress: 75
    },
    {
      id: '2',
      title: 'Data Structures Quiz',
      type: 'quiz',
      last_accessed: 'yesterday',
      progress: 100
    },
    {
      id: '3',
      title: 'JavaScript Fundamentals',
      type: 'course',
      last_accessed: '3 days ago',
      progress: 45
    }
  ]
  
  return (
    <div className="bg-card p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-3">Recent Learning Materials</h3>
      
      <div className="space-y-3">
        {materials.map(material => (
          <div key={material.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{material.title}</p>
              <p className="text-sm text-muted-foreground">{material.type} · {material.last_accessed}</p>
            </div>
            <div className="w-16 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${material.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-center text-muted-foreground hover:text-primary">
        View all materials
      </button>
    </div>
  )
} 