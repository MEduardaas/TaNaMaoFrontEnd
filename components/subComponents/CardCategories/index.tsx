import Image from 'next/image'
import React from 'react'

export default function CardCategories({
  title,
  price
}: {
  title: string
  price: number
}) {
  return (
    <div className="flex flex-col items-start gap-2 border-gray-300 border-2 p-4 rounded-lg max-w-max">
      <Image
        src="/images/logo.png"
        alt="Categorias"
        width={200}
        height={200}
        className="rounded-lg shadow-md"
      />
      <h4>{title}</h4>
      <p className="font-bold">${price}</p>
    </div>
  )
}
