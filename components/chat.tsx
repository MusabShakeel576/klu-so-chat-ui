'use client'

import { useChatStore } from "@/lib/stores"
import Bubble from "@/components/bubble"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"

export default function Chat() {
  const messages = useChatStore((state) => state.messages)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col items-end gap-y-4 overflow-y-auto">
      <AnimatePresence>
        {messages.map((message, index) => <Bubble key={index} index={index} message={message} />)}
      </AnimatePresence>
    </div>
  )
}