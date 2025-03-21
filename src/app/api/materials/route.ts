import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * API route for fetching materials with cursor-based pagination
 * - Implements cursor-based pagination for efficient data loading
 * - Uses appropriate cache headers for API response
 * - Includes proper error handling and validation
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  
  // Get and validate query parameters
  const limit = Math.min(
    Number(searchParams.get('limit') || '10'), 
    50 // Maximum limit
  )
  const cursor = searchParams.get('cursor')
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  
  try {
    const supabase = await createClient()
    
    // Build base query
    let query = supabase
      .from('materials')
      .select('*')
      
    // Apply filters if provided
    if (search) {
      query = query.ilike('title', `%${search}%`)
    }
    
    if (category) {
      query = query.eq('category_id', category)
    }
    
    // Apply cursor-based pagination
    if (cursor) {
      query = query.lt('created_at', cursor)
    }
    
    // Execute query with sorting and limiting
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit + 1) // Get one extra to check for more
      
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch materials' }, 
        { status: 500 }
      )
    }
    
    // Check if there are more results
    const hasMore = data.length > limit
    
    // Remove the extra item we fetched
    const items = hasMore ? data.slice(0, limit) : data
    
    // Get next cursor from the last item
    const nextCursor = items.length > 0 
      ? items[items.length - 1].created_at 
      : null
      
    // Determine appropriate caching based on search params
    let cacheControl = ''
    
    if (search || category) {
      // For filtered data - shorter cache time
      cacheControl = 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
    } else {
      // For unfiltered data - longer cache time
      cacheControl = 'public, max-age=300, s-maxage=1800, stale-while-revalidate=3600'
    }
    
    // Return response with cache headers
    return NextResponse.json(
      { 
        items, 
        nextCursor,
        hasMore 
      },
      { 
        headers: {
          'Cache-Control': cacheControl,
          'Content-Type': 'application/json',
        } 
      }
    )
  } catch (err) {
    console.error('Error in materials API:', err)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
} 