import React from 'react'
import StarRating from '../StarRating'
import Image from 'next/image'

export default function Avaliacao({
  nota,
  nome,
  comentario,
  data
}: {
  nota?: number
  nome?: string
  comentario?: string
  data?: string
}) {
  return (
    <div className="border-t-2 border-gray-300 flex flex-col p-4 mt-4 gap-4">
      <StarRating value={nota || 0} readOnly />
      <p>{comentario}</p>
      <div className="flex items-center gap-4">
        <Image src="/images/avatar.png" width={50} height={50} alt={''} />
        <div className="flex flex-col gap-2">
          <h2>{nome}</h2>
          <p>{data}</p>
        </div>
      </div>
    </div>
  )
}
