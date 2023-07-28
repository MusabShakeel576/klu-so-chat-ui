'use client'

import { LINK_PREVIEW_API_KEY } from '@/lib/env';
import { useChatStore } from '@/lib/stores';
import { Previews } from '@/lib/types';
import { FormEventHandler } from 'react'

interface MessageForm extends HTMLFormElement {
  text: HTMLInputElement;
}

export default function Form() {
  const addMessage = useChatStore((state) => state.addMessage)

  async function fetchLinkPreview(url: string) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Failed to fetch link preview')
    }
    return res.json()
  }

  const handleForm: FormEventHandler<MessageForm> = async (e) => {
    e.preventDefault()
    const { text } = e.currentTarget
    const value = text.value
    e.currentTarget.reset()
    
    const urls = value.match(/\b((https?|ftp|file):\/\/|(www|ftp)\.)[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/ig);
    const previews: Previews = []

    if (urls && urls.length) {
      const fetchPromises = urls.map(url => fetchLinkPreview(`https://api.linkpreview.net/?key=${LINK_PREVIEW_API_KEY}&q=${url}`));

      const results = await Promise.allSettled(fetchPromises)

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          previews.push(result.value)
        } else {
          console.error('Error:', result.reason);
        }
      });
    }

    addMessage({ text: value, previews })
  }

  return (
    <form onSubmit={handleForm}>
      <label htmlFor="text" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Type a new message</label>
      <div className="relative max-w-lg mx-auto">
        <input type="text" id="text" className="block w-full p-4 text-sm text-white bg-transparent border border-gray-300 focus:outline-none rounded-lg dark:border-gray-600 dark:placeholder-gray-400" placeholder="Type a new message" required />
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Send</button>
      </div>
    </form>
  )
}