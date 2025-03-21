'use client'

import { useState, useRef, useEffect } from 'react'
import { useUIStore } from '@/lib/store/useUIStore'
import { debounce } from '@/lib/utils/debounce'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface AITutorClientChatProps {
  userId: string
}

/**
 * AI Tutor Chat Interface
 * - Client Component for interactive chat
 * - Uses debouncing for API calls
 * - Demonstrates client-side state management
 */
export function AITutorClientChat({ userId }: AITutorClientChatProps) {
  // Local state for chat
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I\'m your AI learning assistant. How can I help you today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // Use global UI state from Zustand
  const contentDensity = useUIStore(state => state.contentDensity)
  const addToRecentlyViewed = useUIStore(state => state.addToRecentlyViewed)
  
  // Ref for scrolling to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Helper to scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  // Debounced API call for chat to prevent rate limiting
  const sendMessageToAPI = debounce(async (content: string) => {
    try {
      setIsLoading(true)
      
      // This would be a real API call in production
      // Simulating a delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Add response to chat
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `Here's a response to your query: "${content}"`,
          role: 'assistant',
          timestamp: new Date()
        }
      ])
      
    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message to chat
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: 'Sorry, I had trouble processing your request. Please try again.',
          role: 'assistant',
          timestamp: new Date()
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }, 300)
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    
    // Send to API
    sendMessageToAPI(inputValue)
  }
  
  // Apply content density styles
  const paddingClass = {
    compact: 'p-2',
    comfortable: 'p-4',
    spacious: 'p-6'
  }[contentDensity]
  
  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden bg-background">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.role === 'user' ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'
            }`}
          >
            <div
              className={`rounded-lg ${paddingClass} ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t p-4 bg-background">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type your question..."
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
} 