import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Define types for data structures
interface CategoryPage {
  id: string
  name: string
  description: string
  image_url: string
  materials_count: number
}

interface Material {
  id: string
  title: string
  description: string
  thumbnail_url: string | null
}

// Define metadata generation for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { categoryId: string } 
}): Promise<Metadata> {
  const category = await getCategory(params.categoryId)
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found'
    }
  }
  
  return {
    title: `${category.name} | YouLearn`,
    description: category.description,
    openGraph: {
      title: `${category.name} | YouLearn`,
      description: category.description,
      images: category.image_url ? [category.image_url] : [],
    },
    // Set cache control headers for this route
    other: {
      'cache-control': 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400',
    }
  }
}

// Static Site Generation with dynamic paths
export async function generateStaticParams() {
  const supabase = await createClient()
  
  const { data: categories } = await supabase
    .from('categories')
    .select('id')
    .order('name')
    
  if (!categories) return []
  
  return categories.map(category => ({
    categoryId: category.id
  }))
}

// Get category data
async function getCategory(categoryId: string): Promise<CategoryPage | null> {
  const supabase = await createClient()
  
  // First get the category details
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select(`
      id, 
      name, 
      description, 
      image_url
    `)
    .eq('id', categoryId)
    .maybeSingle()
    
  if (categoryError || !category) return null
  
  // Get the materials count separately
  const { count, error: countError } = await supabase
    .from('materials')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryId)
    
  // Return with properly typed materials_count
  return {
    ...category,
    materials_count: (countError || count === null) ? 0 : count
  }
}

// Get materials for category
async function getMaterials(categoryId: string): Promise<Material[]> {
  const supabase = await createClient()
  
  const { data } = await supabase
    .from('materials')
    .select('id, title, description, thumbnail_url')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })
    .limit(12)
    
  return data || []
}

/**
 * Category page component
 * - Uses generateStaticParams for Static Site Generation (SSG)
 * - Implements Incremental Static Regeneration with revalidate
 * - Combines static content with data that can be periodically refreshed
 */
export default async function CategoryPage({ 
  params 
}: { 
  params: { categoryId: string } 
}) {
  const category = await getCategory(params.categoryId)
  
  if (!category) {
    notFound()
  }
  
  const materials = await getMaterials(params.categoryId)
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground mt-2">{category.description}</p>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Learning Materials</h2>
      
      {materials.length === 0 ? (
        <p>No materials available in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map(material => (
            <div key={material.id} className="border rounded-lg p-4">
              {material.thumbnail_url && (
                <div className="aspect-video mb-3 overflow-hidden rounded-md">
                  <img 
                    src={material.thumbnail_url} 
                    alt={material.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="font-medium">{material.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {material.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Set revalidation time for Incremental Static Regeneration (ISR)
export const revalidate = 3600 // Revalidate every hour 