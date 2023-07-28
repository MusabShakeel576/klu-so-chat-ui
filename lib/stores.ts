import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { produce } from 'immer'
import { Message, Messages } from './types'

interface ChatState {
  messages: Messages
  addMessage: (message: Message) => void
  deleteMessage: (index: number) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) => set(produce((state: { messages: Messages }) => { state.messages.push(message) })),
      deleteMessage: (index) => set(produce((state: { messages: Messages }) => { state.messages.splice(index, 1) })),
    }),
    {
      name: 'klu-chat-storage',
    }
  )
)
