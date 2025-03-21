'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

interface Material {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
  user_id: string
  file_path: string | null
  content_type: string
  // Add other fields as needed
}

interface FetchMaterialsParams {
  limit?: number
  search?: string
  category?: string
}

interface PageResult {
  items: Material[]
  nextCursor: string | null
  hasNextPage: boolean
}

/**
 * Hook to fetch materials with cursor-based pagination and client-side caching
 * Uses TanStack Query for efficient data fetching and cache management
 */
export function useMaterials({
  limit = 10,
  search = '',
  category = '',
}: FetchMaterialsParams = {}) {
  const supabase = createClient()

  return useInfiniteQuery<PageResult>({
    queryKey: ['materials', { limit, search, category }],
    initialPageParam: null,
    queryFn: async ({ pageParam = null }) => {
      // Start with base query
      let query = supabase
        .from('materials')
        .select('*')
        
      // Apply filters if provided
      if (search) {
        query = query.ilike('title', `%${search}%`)
      }
      
      if (category) {
        query = query.eq('category', category)
      }
      
      // Apply cursor pagination
      if (pageParam) {
        query = query.lt('created_at', pageParam)
      }
      
      // Order and limit results
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(limit + 1)
        
      if (error) {
        throw error
      }
      
      // Check if there are more results
      const hasNextPage = data.length > limit
      
      // Remove the extra item we fetched to check for more pages
      const items = hasNextPage ? data.slice(0, limit) : data
      
      // Get the next cursor from the last item
      const nextCursor = items.length > 0 
        ? items[items.length - 1].created_at 
        : null
      
      return {
        items,
        nextCursor,
        hasNextPage,
      }
    },
    getNextPageParam: (lastPage: PageResult) => lastPage.nextCursor,
    // Cache configuration
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Example usage in a component:
 * 
 * function MaterialsList() {
 *   const { 
 *     data, 
 *     fetchNextPage, 
 *     hasNextPage, 
 *     isFetchingNextPage, 
 *     isLoading 
 *   } = useMaterials({ limit: 20 })
 *   
 *   if (isLoading) return <div>Loading...</div>
 *   
 *   return (
 *     <div>
 *       {data.pages.map(page => (
 *         page.items.map(material => (
 *           <MaterialCard key={material.id} material={material} />
 *         ))
 *       ))}
 *       
 *       {hasNextPage && (
 *         <button 
 *           onClick={() => fetchNextPage()} 
 *           disabled={isFetchingNextPage}
 *         >
 *           {isFetchingNextPage ? 'Loading more...' : 'Load more'}
 *         </button>
 *       )}
 *     </div>
 *   )
 * }
 */ 