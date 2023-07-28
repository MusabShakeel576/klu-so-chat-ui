'use client'

import { useChatStore } from "@/lib/stores";
import { Message } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"
import { LinkItUrl } from 'react-linkify-it';
import URLPreview from "@/components/url-preview";

type BubbleProps = {
  index: number;
  message: Message;
}

export default function Bubble({index, message}: BubbleProps) {
  const deleteMessage = useChatStore((state) => state.deleteMessage)

  return (
    <div className="flex flex-col items-end gap-y-2">
      <motion.div layout initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} transition={{ type: "spring" }} className="group relative max-w-md p-4 rounded-t-lg rounded-bl-lg backdrop-filter backdrop-blur-xl bg-opacity-60 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <LinkItUrl className="underline">{message.text}</LinkItUrl>
        <div className="absolute right-2.5 bottom-2.5 cursor-pointer invisible group-hover:visible" onClick={() => deleteMessage(index)}><Trash2 /></div>
      </motion.div>
      <div className="flex flex-col items-end gap-y-1">
        <AnimatePresence>
          {message.previews.map((preview, key) => <URLPreview key={key} preview={preview} />)}
        </AnimatePresence>
      </div>
    </div>
  )
}
