'use client'

import { motion } from "framer-motion"
import { Preview } from '@/lib/types'

type URLPreviewProps = {
  preview: Preview
}

export default function URLPreview({ preview }: URLPreviewProps) {
  return (
    <motion.a href={preview.url} target='_blank' layout initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} transition={{ type: "spring" }} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={preview.image} alt={preview.title} />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{preview.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{preview.description}</p>
      </div>
    </motion.a>
  )
}