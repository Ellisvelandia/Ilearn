import { SupabaseClient } from '@supabase/supabase-js'

export interface PaginationParams {
  limit?: number
  cursor?: string | null
  columnName?: string
  ascending?: boolean
}

export interface PaginatedResult<T> {
  data: T[]
  nextCursor: string | null
  hasMore: boolean
}

/**
 * Handles cursor-based pagination for Supabase queries
 * More efficient than offset pagination for large datasets
 */
export async function paginateResults<T>(
  query: any, // PostgrestFilterBuilder or similar from Supabase
  {
    limit = 10,
    cursor = null,
    columnName = 'created_at',
    ascending = false,
  }: PaginationParams
): Promise<PaginatedResult<T>> {
  // Add pagination parameters to query
  let paginatedQuery = query
    .order(columnName, { ascending })
    .limit(limit + 1) // Fetch one extra to determine if more results exist
  
  // Apply cursor if provided
  if (cursor) {
    paginatedQuery = ascending
      ? paginatedQuery.gt(columnName, cursor)
      : paginatedQuery.lt(columnName, cursor)
  }
  
  const { data, error } = await paginatedQuery
  
  if (error) {
    throw error
  }
  
  // Check if there are more results
  const hasMore = data.length > limit
  
  // Remove the extra item we fetched
  const results = hasMore ? data.slice(0, limit) : data
  
  // Get the next cursor from the last item
  const nextCursor = results.length > 0 ? results[results.length - 1][columnName] : null
  
  return {
    data: results,
    nextCursor,
    hasMore,
  }
}

/**
 * Example usage:
 * 
 * // In a server component or API route:
 * const { data, nextCursor, hasMore } = await paginateResults(
 *   supabase.from('materials').select('*'),
 *   { limit: 10, cursor: req.query.cursor }
 * )
 * 
 * // In the UI, store and pass the nextCursor for subsequent requests
 */ 