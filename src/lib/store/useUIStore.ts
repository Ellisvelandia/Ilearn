'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define the UI state interface
interface UIState {
  // Sidebar state
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  
  // UI preferences
  contentDensity: 'compact' | 'comfortable' | 'spacious'
  setContentDensity: (density: 'compact' | 'comfortable' | 'spacious') => void
  
  // Recently viewed
  recentlyViewed: string[]
  addToRecentlyViewed: (id: string) => void
  clearRecentlyViewed: () => void
}

// Create the store with typed state
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Sidebar state
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
      
      // UI preferences
      contentDensity: 'comfortable' as const,
      setContentDensity: (density: 'compact' | 'comfortable' | 'spacious') => set({ contentDensity: density }),
      
      // Recently viewed
      recentlyViewed: [] as string[],
      addToRecentlyViewed: (id: string) => set((state) => ({
        recentlyViewed: [
          id,
          ...state.recentlyViewed.filter((item) => item !== id)
        ].slice(0, 10) // Keep only 10 most recent
      })),
      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
    }),
    {
      name: 'youlearn-ui-store',
      skipHydration: true,
    }
  )
)

/**
 * UI Store - Zustand
 * Used for client-side UI state management:
 * - Persists user preferences
 * - Manages UI element states
 * - Complements TanStack Query which handles server state
 */ 