import { ChevronRight, Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CardSeguranca({ title, description }: { title: string, description: string }) {
  
  return (
    <Link
      href={`/seguranca/${title}`}
      className="flex flex-col items-start gap-2 border-gray-300 border-2 p-4 rounded-lg max-w-max min-h-max"
    >
        <h4>{title}</h4>
        <p className="text-gray-500">{description}</p>

    </Link>
  )
}

