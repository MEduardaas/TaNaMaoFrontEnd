import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CardProducts({
  id,
  title,
  category,
  price
}: {
  id: number | string
  title: string
  category: string
  price: number
}) {
  return (
    <Link
      href={`/produto/${id}`}
      className="flex flex-col items-start gap-2 border-gray-300 border-2 p-4 rounded-lg max-w-max min-h-max"
    >
      <Image
        src="/images/logo.png"
        alt="Categorias"
        width={200}
        height={200}
        className="rounded-lg shadow-md"
      />
      <h4>{title}</h4>
      <p className="text-gray-500">{category}</p>
      <p className="font-bold">${price}</p>
    </Link>
  )
}
