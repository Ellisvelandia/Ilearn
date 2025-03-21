'use client'

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last invocation.
 * Useful for search inputs, form validation, and other rapidly triggered events.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(later, wait)
  }
}

/**
 * Creates a debounced async function with the ability to cancel
 * pending promises if a new invocation occurs
 */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  func: T,
  wait: number = 300
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeout: NodeJS.Timeout | null = null
  let cancelPrevious: (() => void) | null = null
  
  return function(...args: Parameters<T>): Promise<ReturnType<T>> {
    // Cancel previous promise if it exists
    if (cancelPrevious) {
      cancelPrevious()
      cancelPrevious = null
    }
    
    // Clear existing timeout
    if (timeout) {
      clearTimeout(timeout)
    }
    
    // Create a new promise with cancel capability
    return new Promise((resolve, reject) => {
      let canceled = false
      cancelPrevious = () => {
        canceled = true
        reject({ canceled: true })
      }
      
      // Set new timeout
      timeout = setTimeout(() => {
        // Only invoke and resolve if not canceled
        if (!canceled) {
          func(...args)
            .then(resolve)
            .catch(reject)
            .finally(() => {
              cancelPrevious = null
            })
        }
      }, wait)
    }) as Promise<ReturnType<T>>
  }
}

/**
 * Example usage:
 * 
 * // For simple debounce:
 * const debouncedSearch = debounce((term) => {
 *   // Search logic here
 * }, 300)
 * 
 * // For async debounce with promise handling:
 * const debouncedFetch = debounceAsync(async (term) => {
 *   const response = await fetch(`/api/search?q=${term}`)
 *   return response.json()
 * }, 300)
 * 
 * // Then in your component:
 * const handleSearch = (e) => {
 *   const term = e.target.value
 *   debouncedFetch(term)
 *     .then(results => setResults(results))
 *     .catch(err => {
 *       if (err.canceled) return // Ignore canceled requests
 *       setError(err)
 *     })
 * }
 */ 